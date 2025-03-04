from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from datetime import datetime
from dotenv import load_dotenv
import os

app = Flask(__name__)
# Load environment variables from .env file
load_dotenv()

app.config['SQLALCHEMY_DATABASE_URI'] = os.getenv('DATABASE_URI')
db = SQLAlchemy(app)

class Transactions(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    productID = db.Column(db.String(255))
    productName = db.Column(db.String(255))
    amount = db.Column(db.Float)
    customerName = db.Column(db.String(255))
    status = db.Column(db.Integer, db.ForeignKey('status.id'))
    transactionDate = db.Column(db.DateTime)
    createBy = db.Column(db.String(255))
    createOn = db.Column(db.DateTime)

class Status(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(255))

def prefill_status_table():
    statuses = [
        {'id': 0, 'name': 'Pending'},
        {'id': 1, 'name': 'Completed'},
        {'id': 2, 'name': 'Failed'}
    ]
    for status in statuses:
        if not Status.query.get(status['id']):
            new_status = Status(id=status['id'], name=status['name'])
            db.session.add(new_status)
    db.session.commit()

if __name__ == '__main__':
    with app.app_context():
        db.create_all()
        prefill_status_table()

@app.route('/add_transaction', methods=['POST'])
def add_transactions():
    data = request.get_json()
    new_transaction = Transactions(
        productID=data['productID'],
        productName=data['productName'],
        amount=data['amount'],
        customerName=data['customerName'],
        status=data['status'],
        transactionDate=datetime.strptime(data['transactionDate'], '%Y-%m-%d %H:%M:%S'),
        createBy=data['createBy'],
        createOn=datetime.strptime(data['createOn'], '%Y-%m-%d %H:%M:%S')
    )
    db.session.add(new_transaction)
    db.session.commit()
    return jsonify({'message': 'Transaction added successfully'}), 201

@app.route('/edit_transaction/<int:id>', methods=['PUT'])
def edit_transaction(id):
    data = request.get_json()
    transaction = Transactions.query.get(id)
    if not transaction:
        return jsonify({'message': 'Transaction not found'}), 404
    transaction.productID = data['productID']
    transaction.productName = data['productName']
    transaction.amount = data['amount']
    transaction.customerName = data['customerName']
    transaction.status = data['status']
    transaction.transactionDate = datetime.strptime(data['transactionDate'], '%Y-%m-%d %H:%M:%S')
    transaction.createBy = data['createBy']
    transaction.createOn = datetime.strptime(data['createOn'], '%Y-%m-%d %H:%M:%S')
    db.session.commit()
    return jsonify({'message': 'Transaction updated successfully'})

@app.route('/get_transactions', methods=['GET'])
def get_transactions():
    transactions = Transactions.query.all()
    output = []
    for transaction in transactions:
        transaction_data = {
            'id': transaction.id,
            'productID': transaction.productID,
            'productName': transaction.productName,
            'amount': transaction.amount,
            'customerName': transaction.customerName,
            'status': Status.query.get(transaction.status).name,  # Convert status id to name
            'transactionDate': transaction.transactionDate.strftime('%Y-%m-%d %H:%M:%S'),
            'createBy': transaction.createBy,
            'createOn': transaction.createOn.strftime('%Y-%m-%d %H:%M:%S')
        }
        output.append(transaction_data)

        status = Status.query.all()
        status_data = []
        for status in status:
            status_data.append({'id': status.id, 'name': status.name})
        return jsonify({'data': output, 'status': status_data})

if __name__ == '__main__':
    app.run(debug=True)