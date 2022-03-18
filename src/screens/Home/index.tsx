import React from 'react'
import {View, Image, FlatList, Text, TouchableOpacity} from 'react-native'
import {t} from 'react-native-tailwindcss'
import {BaseScreen} from '@app/components'
import {ItemProps} from '@app/types/item'

const Logo = require('../../assets/images/logo.png')

const items: ItemProps[] = [
  {
    id: 'Ethereum',
    title: 'Ethereum',
  },
  {
    id: 'Bitcoin',
    title: 'Bitcoin',
  },
]

export default function Home({navigation}: any) {
  const renderItem = ({item}: any) => {
    const handleClick = () => {
      navigation.navigate('Detail', {...item})
    }

    return <WalletItem {...item} handleClick={handleClick} />
  }

  return (
    <BaseScreen>
      <View style={[t.itemsCenter]}>
        <Image source={Logo} />
      </View>
      <View style={[t.mT10]}>
        <FlatList
          data={items}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
        />
      </View>
    </BaseScreen>
  )
}

function WalletItem(
  props: ItemProps & {
    handleClick: () => void
  },
) {
  return (
    <TouchableOpacity
      style={[
        t.h20,
        t.itemsCenter,
        t.justifyCenter,
        t.borderB,
        t.borderGray400,
      ]}
      onPress={props.handleClick}
    >
      <Text style={[t.text2xl]}>{props.title}</Text>
    </TouchableOpacity>
  )
}
