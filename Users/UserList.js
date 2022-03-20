import React from "react"

import { Box,FlatList,HStack,VStack,Text,Spacer, Heading} from "native-base"

import Pressable from "react-native/Libraries/Components/Pressable/Pressable";

export default function UserList({data, onPress}) {
  const getHeder = () => {
    return <Heading fontSize="xl" p="4" pb="3">
              Użytkownicy
            </Heading>
  };
    return (
        <FlatList
        data={data}
        ListHeaderComponent={getHeder}
        renderItem={({ item }) => (
          <Pressable onPress={()=>onPress(item)}>
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
                      {`Email: ${item.email}`}
                    </Text>

                    <Text
                      color="coolGray.600"
                      _dark={{
                        color: "warmGray.200",
                      }}
                    >
                      {`Imie: ${item.name}`}
                    </Text>
                     <Text
                      color="coolGray.600"
                      _dark={{
                        color: "warmGray.200",
                      }}
                    >
                      {`Nazwisko: ${item.surname}`}
                    </Text>
                  </VStack>

                  <Spacer />
                </HStack>
              </Box>
          </Pressable>
        )}
        keyExtractor={(item) => item.id}
      />
    )
}