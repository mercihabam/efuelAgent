import React from 'react';
import * as Print from 'expo-print';
import * as MediaLibrary from 'expo-media-library';
import * as Sharing from 'expo-sharing';
import * as FileSystem from 'expo-file-system';
import { Platform, ToastAndroid } from 'react-native';
import { Asset } from 'expo-asset';
import { StorageAccessFramework } from 'expo-file-system';

function html(img){
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
        <h1>#01</h1>
    </header>
    <main>
        <div style="font-weight: bold; margin-bottom: 20px">STATION IHUSI</div>
        <div style="display: flex; justify-content: space-between; margin-bottom: 5px">
            <div>Client :</div>
            <div>Merci Jacob</div>
        </div>
        <div style="display: flex; justify-content: space-between; margin-bottom: 5px">
            <div>Montant :</div>
            <div>2</div>
        </div>
        <div style="display: flex; justify-content: space-between; margin-bottom: 5px">
            <div>Date :</div>
            <div>30/09/2021 16:00</div>
        </div>
    </main>
</body>
</html>`
    )
}

const copyFromAsset = async(asset) =>{
    try {
        Asset.loadAsync(asset)
        const { localUri } = Asset.fromModule(asset);
        return localUri;
    } catch (error) {
        console.error(error);
        throw error
    }
}

export async function createPdf(){
    try {
        const img = await copyFromAsset(logo);
        let album = await MediaLibrary.getAlbumAsync('efuelInvoice');
        const { uri, base64 } = await Print.printToFileAsync({ html: html(img),  width: 300, height: 400});
        if(Platform.OS === 'ios'){
            await Sharing.shareAsync(uri)
        }else{
            const permission = await MediaLibrary.requestPermissionsAsync();
            const permissions = await StorageAccessFramework.requestDirectoryPermissionsAsync('/');
            if(permissions.granted){
                const dirUri = permissions.directoryUri;
                let invoiceDir = StorageAccessFramework.getUriForDirectoryInRoot('efuelinvoice');
                console.log(invoiceDir);
                if(invoiceDir){
                    const file = await StorageAccessFramework.createFileAsync(`${invoiceDir}`, 'invoice', 'application/pdf' );
                    const data = await FileSystem.readAsStringAsync(uri, { encoding: 'base64' });
                    await StorageAccessFramework.writeAsStringAsync(file, data, { encoding: 'base64' });
                }else{
                    invoiceDir = await StorageAccessFramework.makeDirectoryAsync(dirUri, 'efuelinvoice');
                    const file = await StorageAccessFramework.createFileAsync(`${invoiceDir}`, 'invoice', 'application/pdf' );
                    await StorageAccessFramework.writeAsStringAsync(file, base64, { encoding: 'base64' });
                }
                ToastAndroid.showWithGravity('Facture enregistree en pdf', 10000, ToastAndroid.CENTER)
            }
            // if(permission.granted){
            //     const asset = await MediaLibrary.createAssetAsync(uri);
            //     if(!album){
            //         album = await MediaLibrary.createAlbumAsync('efuelInvoice', asset, false);
            //         FileSystem.m
            //     }else{
            //         await MediaLibrary.addAssetsToAlbumAsync([asset], album, false);
            //     }
            //     ToastAndroid.showWithGravity('Facture enregistree en pdf', 10000, ToastAndroid.CENTER)
            // }
        }
    } catch (error) {
        console.error(error);
    }
}