var blocktrail = require('blocktrail-sdk');
var crypto = require('crypto');
var backupGenerator = require('blocktrail-sdk/lib/backup_generator');

var fs = require('fs');

var client = blocktrail({
    apiKey : "MY_APIKEY",
    apiSecret : "MY_APISECRET",
    testnet : true
});

//create a new wallet
var walletIdentifier = "nodejs-example-" + crypto.randomBytes(24).toString('hex');
client.createNewWallet(walletIdentifier, "example-strong-password", 9999, function(err, wallet, primaryMnemonic, backupMnemonic, blocktrailPubKeys) {
    if (err) {
        return console.log("createNewWallet ERR", err);
    }

    //console.log('primary mnemonic', primaryMnemonic);
    //console.log('backup mnemonic', backupMnemonic);
    //console.log('blocktrail pubkeys', blocktrailPubKeys);

    //generate the backup document
    var backup = new backupGenerator(primaryMnemonic, backupMnemonic, blocktrailPubKeys);
    var result = backup.generateHTML();

    fs.writeFile("examples/my-wallet-backup.html", result, function(err) {
        if(err) {
            console.log(err);
        } else {
            console.log("The file was saved!");
        }
    });
    console.log();
});