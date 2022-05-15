import React from 'react';
import { Box, Text } from 'native-base';
import { useGlobalContext } from '../GlobalContext';
import { marginBottom, overflow, paddingBottom } from 'styled-system';
import { SafeAreaView, ScrollView } from 'react-native';

function Help() {
    const {globalStyles: { headerText, paragraphText, titleText }} = useGlobalContext();

    return (
      <SafeAreaView>
        <ScrollView>
          <Box style={{flex:1}}>
            
            <Text style={titleText}>
                Jak korzystać z aplikacji?
            </Text>

            <Text style={headerText}>
                Strona startowa
            </Text>
            <Text style={paragraphText}>
                1. Na stronie startowej widzimy wszyskie aktywne spotkania, na które się zapisaliśmy lub które utworzyliśmy
            </Text>

            <Text style={headerText}>
                Dodawanie spotkania
            </Text>
            <Text style={paragraphText}>
                1. Z bocznego menu należy wybrać zakładkę Dodaj Spotkanie
                {'\n'}
                2. W polu Meeting wpisujemy nazwę spotkania, a w Description jego opis, klikamy Next
                {'\n'}
                3. Następnie wybieramy datę i godzinę planowanego spotkania, klikamy Next
                {'\n'}
                4. Ostatecznie ustawiamy godzinę przypomnienia o spotkaniu, klikamy Finish
                {'\n'}
                5. Gratulacje! Dodałeś spotkanie!
            </Text>

            <Text style={headerText}>
                Dołączanie do spotkania za pomocą kodu QR
            </Text>
            <Text style={paragraphText}>
                1. Z bocznego menu należy wybrać zakładkę Zeskanuj Kod QR
                {'\n'}
                2. Należy zezwolić aplikacji na korzystanie z aparatu
                {'\n'}
                3. Kierujemy aparat na kod QR
                {'\n'}
                4. Gratulacje! Dołączyłeś do spotkania!
            </Text>

            <Text style={headerText}>
                Usuwanie spotkania
            </Text>
            <Text style={paragraphText}>
                1. Z menu bocznego należy wybrać zakładkę Home
                {'\n'}
                2. Na liście szukamy spotkania które chcemy usunąć
                {'\n'}
                3. Klikamy i przytrzymujemy wybrane spotkanie
                {'\n'}
                4. Następnie powinno pojawić się okienko do potwierdzenia usunięcia wybranego spotkania
                {'\n'}
                5. Klikamy Tak i gotowe!
            </Text>
            
          </Box>
        </ScrollView>
      </SafeAreaView>
      
    );
}

export default Help;