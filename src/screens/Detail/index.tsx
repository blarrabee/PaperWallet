import React, {useState, useEffect, useRef} from 'react'
import {View, ScrollView} from 'react-native'
import {t} from 'react-native-tailwindcss'
import QRCode from 'react-native-qrcode-svg'
import RNHTMLtoPDF from 'react-native-html-to-pdf'
import Share from 'react-native-share'
import {BaseScreen, Button, Paragraph} from '@app/components'
import {generateBitcoinWallet} from '@app/services'

export default function Detail({route, navigation}: any) {
  const {title} = route.params

  const [publicKey, setPublicKey] = useState<string | null>(null)
  const [privateKey, setPrivateKey] = useState<string | null>(null)

  const generate = () => {
    if (title === 'Ethereum') {
      const key = generateBitcoinWallet()
      setPublicKey(key.publicKey)
      setPrivateKey(key.privateKey)
    }
    if (title === 'Bitcoin') {
      const key = generateBitcoinWallet()
      setPublicKey(key.publicKey)
      setPrivateKey(key.privateKey)
    }
  }

  useEffect(() => {
    navigation.setOptions({title})
    generate()
  }, [title])

  return (
    <BaseScreen>
      <ScrollView>
        <Content
          publicKey={publicKey}
          privateKey={privateKey}
          generate={generate}
        />
      </ScrollView>
    </BaseScreen>
  )
}

function Content(props: {
  publicKey: string | null
  privateKey: string | null
  generate: () => void
}) {
  const {publicKey, privateKey, generate} = props

  let pubicKeyRef = useRef(null)
  let privateKeyRef = useRef(null)

  const print = () => {
    let html = ''
    // @ts-ignore
    pubicKeyRef.toDataURL((data: any) => {
      html = '<h1>Public key</h1>'
      html = `${html}<h2>${publicKey}</h2>`
      html = `${html}<img src="data:image/png;base64,${data}" /><br />`
      // @ts-ignore
      privateKeyRef.toDataURL((nextData: any) => {
        html = `${html}<h1>Private key</h1>`
        html = `${html}<h2>${privateKey}</h2>`
        html = `${html}<img src="data:image/png;base64,${nextData}" />`
        finalizePrint(html)
      })
    })
  }

  const finalizePrint = async (html: string) => {
    const options = {
      html,
      fileName: 'Result',
      directory: 'Documents',
      width: 612,
      height: 900,
    }

    const file = await RNHTMLtoPDF.convert(options)
    // console.log(file.filePath);
    console.log(file.filePath)
    Share.open({
      title: 'Result',
      message: '',
      url: file.filePath,
    })
  }

  if (!publicKey || !privateKey) {
    return null
  }

  return (
    <>
      <View style={[t.mT2]}>
        <Button onPress={print} text="Print" />
      </View>
      <View style={[t.mT2]}>
        <Button onPress={generate} text="Generate" />
      </View>
      <View style={[t.mT10]}>
        <Paragraph
          text="Public Key"
          type="bold"
          align="center"
          size={20}
          marginBottom={10}
        />
        <Paragraph text={publicKey} align="center" />
        <View style={[t.itemsCenter, t.mT2]}>
          <QRCode
            size={200}
            value={publicKey}
            getRef={(c) => (pubicKeyRef = c)}
          />
        </View>
      </View>
      <View style={[t.mT4]}>
        <Paragraph
          text="Private Key"
          type="bold"
          align="center"
          size={20}
          marginBottom={10}
        />
        <Paragraph text={privateKey} align="center" />
        <View style={[t.itemsCenter, t.mT2]}>
          <QRCode
            size={200}
            value={privateKey}
            getRef={(c) => (privateKeyRef = c)}
          />
        </View>
      </View>
    </>
  )
}
