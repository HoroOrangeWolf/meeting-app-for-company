import React from "react"

import { Box,FlatList,HStack,VStack,Text,Spacer, Heading} from "native-base"

import Pressable from "react-native/Libraries/Components/Pressable/Pressable";

export default function List({data, longPress, onPress}) {
  const getHeder = () => {
    return <Heading fontSize="xl" p="4" pb="3">
              Zaplanowane spotkania
            </Heading>
  };
    return (
        <FlatList
        data={data}
        ListHeaderComponent={getHeder}
        renderItem={({ item }) => (
          <Pressable onPress={()=>onPress(item)} onLongPress = {()=>longPress(item)}>
                <Box
                borderBottomWidth="4"
                _dark={{
                  borderColor: "gray.600",
                }}
                borderColor="coolGray.200"
                pl="4"
                pr="5"
                py="2"
              >
                <HStack space={1} justifyContent="space-between">

                  <VStack>
                    <Text
                      _dark={{
                        color: "warmGray.50",
                      }}
                      color="coolGray.800"
                      bold
                    >
                      {`Nazwa spotkania: ${item.name}`}
                    </Text>

                    <Text
                      color="coolGray.600"
                      _dark={{
                        color: "warmGray.200",
                      }}
                    >
                      {`Opis: ${item.description}`}
                    </Text>
                  </VStack>

                  <Spacer />
                  <Text
                    fontSize="xs"
                    _dark={{
                      color: "warmGray.50",
                    }}
                    color="coolGray.800"
                    alignSelf="flex-start"
                  >
                    {new Date(item.timeDate).toUTCString()}
                  </Text>
                </HStack>
              </Box>
          </Pressable>
        )}
        keyExtractor={(item) => item.id}
      />
    )
}