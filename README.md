# Payment Exercise
This is the exercise for mock payment. It is a fun challenge.

##Installation instruction:

Have NodeJS installed locally.
> git clone https://github.com/brianpchsu/payment_exercise.git

> cd payment_exercise

> npm install

Running
> node index.js

Open browser with this url: http://localhost:9000/

### Working demo
Infinite scrolling with initial 300 transactions data: http://screencast.com/t/I6Xq57Ewo00d

Send money and see result in transaction history: http://screencast.com/t/Da3sJdV1aj6S
### Snapshots
![Home Screen] (./screenshot/home_screen.png?raw=true)
![Send Money] (./screenshot/send_money.png?raw=true)
![Confirmation] (./screenshot/confirm.png?raw=true)
![Transactions] (./screenshot/transactions.png?raw=true)

### TODOs:
1. Finish styling
2. Move general route functions to separated JS module
3. Constant-ize request urls
4. Consider all the edge cases when reaching to the end of transaction data
5. Show spinner for 0.5s after submitting transaction form to have better UX
6. Provide NodeJS health check end point with cpu and memory usage info
