import React from 'react';
import * as Print from 'expo-print';
import * as MediaLibrary from 'expo-media-library';
import * as Sharing from 'expo-sharing';
import * as FileSystem from 'expo-file-system';
import { Platform, ToastAndroid } from 'react-native';
import { StorageAccessFramework } from 'expo-file-system';
import moment from 'moment';

function html(data, station){
    return(
        `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
    <style> 
        @page { margin: 20px; width: 200px } 
        header{
            width: 100%,
            display: flex,
            justify-content: space-between,
            margin-bottom: 20px
        }
    </style>
</head>
<body>
    <header style="padding-bottom: 10px; border-bottom: 1px dashed black; display: flex; justify-content: space-between; margin-bottom: 20px;">
        <div>
            <h1>EFUEL-POINT</h1>
            <div>+243977426917</div>
            <div>efuelpoint@contact.com</div>
        </div>
        <h1>#${data.trans.id}</h1>
    </header>
    <main>
        <div style="font-weight: bold; margin-bottom: 20px; text-transform: uppercase;">STATION : ${station}</div>
        <div style="display: flex; justify-content: space-between; margin-bottom: 5px">
            <div>Nom du bénéficiaire :</div>
            <div>${data.receiver.fullName}</div>
        </div>
        <div style="display: flex; justify-content: space-between; margin-bottom: 5px">
            <div>Montant :</div>
            <div> ${data.trans.amount} litre${data.trans.amount > 1 ? 's': ''} </div>
        </div>
        <div style="display: flex; justify-content: space-between; margin-bottom: 5px">
            <div>Date :</div>
            <div> ${ moment(data.trans.createdAt).format('L LT') } </div>
        </div>

        <div style="display: flex; justify-content: space-between; margin-bottom: 20px; margin-top: 25px">
            <div>Solde du bénéficiaire :</div>
            <div> ${data.receiver.Wallet.balance} litre${data.receiver.Wallet.balance > 1 ? 's': ''} </div>
        </div>
    </main>
    <footer style="padding-top: 10px; border-top: 1px dashed black">
        <em style="font-size: 8px">
            merci d'avoir utilisé efuel-point
        </em>
    </footer>
</body>
</html>`
    )
}

export async function createProof(data, stationName){
    try {
        const clName = data.receiver.fullName || '';
        const name = clName.split(' ')[0];
        const { uri, base64 } = await Print.printToFileAsync({ html: html(data, stationName),  width: 300, height: 400});
        if(Platform.OS === 'ios'){
            await Sharing.shareAsync(uri)
        }else{
            const permissions = await StorageAccessFramework.requestDirectoryPermissionsAsync();
            if(permissions.granted){
                const dirUri = permissions.directoryUri;
                let invoiceDir = StorageAccessFramework.getUriForDirectoryInRoot('efuelinvoice');
                if(invoiceDir){
                    const file = await StorageAccessFramework.createFileAsync(`${dirUri}/${invoiceDir}`, `proof-${name}`, 'application/pdf' );
                    const data = await FileSystem.readAsStringAsync(uri, { encoding: 'base64' });
                    await StorageAccessFramework.writeAsStringAsync(file, data, { encoding: 'base64' });
                }else{
                    invoiceDir = await StorageAccessFramework.makeDirectoryAsync(dirUri, 'efuelinvoice');
                    const file = await StorageAccessFramework.createFileAsync(`${dirUri}/${invoiceDir}`, `proof-${name}`, 'application/pdf' );
                    const data = await FileSystem.readAsStringAsync(uri, { encoding: 'base64' });
                    await StorageAccessFramework.writeAsStringAsync(file, data, { encoding: 'base64' });
                }
                ToastAndroid.showWithGravity('Preuve enregistree en pdf', 10000, ToastAndroid.CENTER)
            }
        }
    } catch (error) {
        console.error(error);
    }
}