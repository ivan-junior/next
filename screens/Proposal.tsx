import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Icon, Input, Text } from "@rneui/themed";
import { useState } from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import SelectDropdown from "react-native-select-dropdown";
import getCep from "../apis/cep";
import { ICepResponse } from "../interfaces/cepResponse";
import { RootStackParamList } from "../types";
type ProposalScreenProps = NativeStackScreenProps<RootStackParamList, 'Login'>

export const Proposal: React.FC<ProposalScreenProps> = (props) => {
    const [cep, setCep] = useState('')
    const [logradouro, setLogradouro] = useState('')
    const [complemento, setComplemento] = useState('')
    const [bairro, setBairro] = useState('')
    const [localidade, setLocalidade] = useState('')
    const [uf, setUf] = useState('')

    return (
        <ScrollView style={styles.container}>
            <Text h4 style={styles.topicItem}>
                Dados do Cliente
            </Text>
            <Input
                label='Nome da Oportunidade'
                inputContainerStyle={styles.inputContainerStyle}
                inputStyle={styles.inputStyle}
                containerStyle={styles.containerStyle}
            />
            <View style={{width: '100%', padding: 10}}>
                <SelectDropdown
                    data={[
                        {optionName: 'Feiras e Eventos', value: 'c7a35a3c-da47-4930-84a2-0a723cd7d7c3'},
                        {optionName: 'YouTube', value: 'c4a30f8a-a411-4185-b9d2-0c63c3abcfaa'},
                        {optionName: 'Prospecção Ativa', value: '8af7fb78-1f67-4716-90b2-1f3c74c610d4'},
                        {optionName: 'Indicação', value: '3df88965-5a59-43ad-beb6-2646d17cf321'},
                        {optionName: 'Material Promocional', value: '06968f1c-8d1d-488e-a2fb-28d173cee683'},
                        {optionName: 'Outbound', value: '24ae83ab-b2de-4645-9896-320367defedf'},
                        {optionName: 'Mídias Digitais', value: '16492712-326b-45e3-9d0e-50ee8ea38401'},
                        {optionName: 'Integrador', value: '05b91d67-b712-4898-ad81-6bf42d6982af'},
                        {optionName: 'Loja Física', value: 'a19a5526-6d12-4a34-8d63-887950de9120'},
                        {optionName: 'Parcerias Locais', value: '89f408c3-f689-4bb9-a282-90de54a57eb3'},
                        {optionName: 'Contatos Pessoais', value: '51384a6d-a926-46cb-8dba-aa36e20c588b'},
                        {optionName: 'Instagram', value: '6ecbc651-7702-4f86-a71e-b845a33dbecf'},
                        {optionName: 'Ligação na Loja', value: 'a1c38fe3-e379-4c0b-846e-c2cf45822c87'},
                        {optionName: 'Anúncio em Outro Site', value: '107f2143-cbb9-4939-80f5-fab324103349'},
                    ]}
                    buttonStyle={styles.dropdown2BtnStyle2}
                    buttonTextStyle={styles.dropdown2BtnTxtStyle}
                    dropdownStyle={styles.dropdown2DropdownStyle}
                    rowStyle={styles.dropdown2RowStyle}
                    rowTextStyle={styles.dropdown2RowTxtStyle}
                    selectedRowStyle={styles.dropdown2SelectedRowStyle}
                    onSelect={(selectedItem, index) => {
                        // console.log(selectedItem, index)
                    }}
                    buttonTextAfterSelection={(item, index) => {
                        return `Origem: ${item.optionName}`
                    }}
                    rowTextForSelection={(item, index) => {
                        return item.optionName
                    }}
                    defaultButtonText='Selecione a Origem'
                    renderDropdownIcon={isOpened => {
                        return <Icon name={isOpened? 'chevron-up' : 'chevron-down'} type='font-awesome-5' color={'black'} size={18} />
                    }}
                    dropdownIconPosition={'right'}
                />
                <SelectDropdown
                    data={[
                        {optionName: 'Pessoa Física', value: '1'},
                        {optionName: 'Pessoa Jurídica', value: '2'}
                    ]}
                    onSelect={(selectedItem, index) => {
                        // console.log(selectedItem, index)
                    }}
                    buttonTextAfterSelection={(item, index) => {
                        return `Tipo: ${item.optionName}`
                    }}
                    rowTextForSelection={(item, index) => {
                        return item.optionName
                    }}
                    buttonStyle={styles.dropdown2BtnStyle}
                    buttonTextStyle={styles.dropdown2BtnTxtStyle}
                    dropdownStyle={styles.dropdown2DropdownStyle}
                    rowStyle={styles.dropdown2RowStyle}
                    rowTextStyle={styles.dropdown2RowTxtStyle}
                    selectedRowStyle={styles.dropdown2SelectedRowStyle}
                    defaultButtonText='Selecione o tipo'
                    renderDropdownIcon={isOpened => {
                        return <Icon name={isOpened? 'chevron-up' : 'chevron-down'} type='font-awesome-5' color={'black'} size={18} />
                    }}
                    dropdownIconPosition={'right'}
                />
            
            </View>
            <Input
                label='CPF'
                inputContainerStyle={styles.inputContainerStyle}
                inputStyle={styles.inputStyle}
                containerStyle={styles.containerStyle}
            />
            <Input
                label='Nome'
                inputContainerStyle={styles.inputContainerStyle}
                inputStyle={styles.inputStyle}
                containerStyle={styles.containerStyle}
            />
            <Input
                label='Sobrenome'
                inputContainerStyle={styles.inputContainerStyle}
                inputStyle={styles.inputStyle}
                containerStyle={styles.containerStyle}
            />
            <Input
                label='Email'
                inputContainerStyle={styles.inputContainerStyle}
                inputStyle={styles.inputStyle}
                containerStyle={styles.containerStyle}
            />
            <Input
                label='Telefone'
                inputContainerStyle={styles.inputContainerStyle}
                inputStyle={styles.inputStyle}
                containerStyle={styles.containerStyle}
            />
            <Text h4 style={styles.topicItem}>
                Endereço da Instalação
            </Text>
            <Input
                label='CEP'
                inputContainerStyle={styles.inputContainerStyle}
                inputStyle={styles.inputStyle}
                containerStyle={styles.containerStyle}
                onChangeText={value => setCep(value)}
                rightIcon={
                    <Icon 
                        name="search"
                        size={30}
                        color='gray'
                        onPressIn={() => getCep(cep).then((response: ICepResponse) => {
                            console.log(response)
                            setLogradouro(response.logradouro)
                            setComplemento(response.complemento)
                            setBairro(response.bairro)
                            setLocalidade(response.localidade)
                            setUf(response.uf)
                        })}

                    />
                }
                keyboardType='number-pad'
            />
            <Input
                label='Endereço'
                inputContainerStyle={styles.inputContainerStyle}
                inputStyle={styles.inputStyle}
                containerStyle={styles.containerStyle}
                onChangeText={value => setLogradouro(value)}
                value={logradouro}
            />
            <Input
                label='Número'
                inputContainerStyle={styles.inputContainerStyle}
                inputStyle={styles.inputStyle}
                containerStyle={styles.containerStyle}
            />
            <Input
                label='Complemento'
                inputContainerStyle={styles.inputContainerStyle}
                inputStyle={styles.inputStyle}
                containerStyle={styles.containerStyle}
                onChangeText={value => setComplemento(value)}
                value={complemento}
            />
            <Input
                label='Bairro'
                inputContainerStyle={styles.inputContainerStyle}
                inputStyle={styles.inputStyle}
                containerStyle={styles.containerStyle}
                disabled={true}
                onChangeText={value => setBairro(value)}
                value={bairro}
            />
            <Input
                label='Cidade'
                inputContainerStyle={styles.inputContainerStyle}
                inputStyle={styles.inputStyle}
                containerStyle={styles.containerStyle}
                disabled={true}
                onChangeText={value => setLocalidade(value)}
                value={localidade}
            />
            <Input
                label='Estado'
                inputContainerStyle={styles.inputContainerStyle}
                inputStyle={styles.inputStyle}
                containerStyle={styles.containerStyle}
                disabled={true}
                onChangeText={value => setUf(value)}
                value={uf}
            />
            <View style={{width: '100%', padding: 10}}>
                <SelectDropdown
                    data={[
                        {optionName: 'Rural', value: 'e2034cda-51cd-4e0f-8eda-062c36e8cac1'},
                        {optionName: 'Residencial', value: '8df460ec-8252-4d59-be5f-af55fffb1c35'},
                        {optionName: 'Comercial', value: 'faa98dbe-6620-4aea-b99f-bfd0b6cce910'},
                        {optionName: 'Industrial', value: 'b5657fae-2c82-4de7-b48d-c136ff9169e7'}
                    ]}
                    onSelect={(selectedItem, index) => {
                        // console.log(selectedItem, index)
                    }}
                    buttonTextAfterSelection={(item, index) => {
                        return `Tipo de endereço: ${item.optionName}`
                    }}
                    rowTextForSelection={(item, index) => {
                        return item.optionName
                    }}
                    buttonStyle={styles.dropdown2BtnStyle}
                    buttonTextStyle={styles.dropdown2BtnTxtStyle}
                    dropdownStyle={styles.dropdown2DropdownStyle}
                    rowStyle={styles.dropdown2RowStyle}
                    rowTextStyle={styles.dropdown2RowTxtStyle}
                    selectedRowStyle={styles.dropdown2SelectedRowStyle}
                    defaultButtonText='Selecione o tipo de endereço'
                    renderDropdownIcon={isOpened => {
                        return <Icon name={isOpened? 'chevron-up' : 'chevron-down'} type='font-awesome-5' color={'black'} size={18} />
                    }}
                    dropdownIconPosition={'right'}
                />
            </View>
            <Text h4 style={styles.topicItem}>
                Dados da Instalação
            </Text>
            <View style={{width: '100%', padding: 10}}>
                <SelectDropdown
                    data={[
                        {optionName: 'Carport', value: '94ccabd0-aa09-47e6-b59c-1aab75a3f8cd'},
                        {optionName: 'Cerâmico', value: '021a8b27-6964-4b23-a5ab-8fd6e4c39ee6'},
                        {optionName: 'Fibrocimento', value: '126e5ff2-f586-4934-8041-1268198df278'},
                        {optionName: 'Laje', value: '2c239820-481b-41ce-931e-507a06c16c1d'},
                        {optionName: 'Metálico', value: '366a3675-ffbe-4387-bc43-9c8b05cfa86a'},
                        {optionName: 'Solo', value: '01aebca3-0349-403c-843c-51ff42dfe64e7'}
                    ]}
                    onSelect={(selectedItem, index) => {
                        // console.log(selectedItem, index)
                    }}
                    buttonTextAfterSelection={(item, index) => {
                        return `Estrutura para: ${item.optionName}`
                    }}
                    rowTextForSelection={(item, index) => {
                        return item.optionName
                    }}
                    buttonStyle={styles.dropdown2BtnStyle2}
                    buttonTextStyle={styles.dropdown2BtnTxtStyle}
                    dropdownStyle={styles.dropdown2DropdownStyle}
                    rowStyle={styles.dropdown2RowStyle}
                    rowTextStyle={styles.dropdown2RowTxtStyle}
                    selectedRowStyle={styles.dropdown2SelectedRowStyle}
                    defaultButtonText='Estrutura para:'
                    renderDropdownIcon={isOpened => {
                        return <Icon name={isOpened? 'chevron-up' : 'chevron-down'} type='font-awesome-5' color={'black'} size={18} />
                    }}
                    dropdownIconPosition={'right'}
                />
                <SelectDropdown
                    data={[
                        {optionName: '127', value: '230050d7-aac0-497e-a20b-f0e443f8ae96'},
                        {optionName: '127/220', value: '22b59d1a-a1ab-4db7-b3e4-767bf60110df'},
                        {optionName: '220', value: 'ac3eb4d6-a789-492b-9343-be350ba60131'},
                        {optionName: '220/380', value: '59940752-966d-4054-be98-9dd91f52edc0'},
                        {optionName: '380/440', value: 'b8ef4968-ac4c-4cee-9280-d1b72d0c05b07'}
                    ]}
                    onSelect={(selectedItem, index) => {
                        // console.log(selectedItem, index)
                    }}
                    buttonTextAfterSelection={(item, index) => {
                        return `Tensão: ${item.optionName}`
                    }}
                    rowTextForSelection={(item, index) => {
                        return item.optionName
                    }}
                    buttonStyle={styles.dropdown2BtnStyle2}
                    buttonTextStyle={styles.dropdown2BtnTxtStyle}
                    dropdownStyle={styles.dropdown2DropdownStyle}
                    rowStyle={styles.dropdown2RowStyle}
                    rowTextStyle={styles.dropdown2RowTxtStyle}
                    selectedRowStyle={styles.dropdown2SelectedRowStyle}
                    defaultButtonText='Tensão:'
                    renderDropdownIcon={isOpened => {
                        return <Icon name={isOpened? 'chevron-up' : 'chevron-down'} type='font-awesome-5' color={'black'} size={18} />
                    }}
                    dropdownIconPosition={'right'}
                />
                <SelectDropdown
                    data={[
                        {optionName: 'Monofásico', value: 'MONOFASICO'},
                        {optionName: 'Bifásico', value: 'BIFASICO'},
                        {optionName: 'Trifásico', value: 'TRIFASICO'}
                    ]}
                    onSelect={(selectedItem, index) => {
                        // console.log(selectedItem, index)
                    }}
                    buttonTextAfterSelection={(item, index) => {
                        return `Tipo de ligação: ${item.optionName}`
                    }}
                    rowTextForSelection={(item, index) => {
                        return item.optionName
                    }}
                    buttonStyle={styles.dropdown2BtnStyle}
                    buttonTextStyle={styles.dropdown2BtnTxtStyle}
                    dropdownStyle={styles.dropdown2DropdownStyle}
                    rowStyle={styles.dropdown2RowStyle}
                    rowTextStyle={styles.dropdown2RowTxtStyle}
                    selectedRowStyle={styles.dropdown2SelectedRowStyle}
                    defaultButtonText='Tipo de ligação:'
                    renderDropdownIcon={isOpened => {
                        return <Icon name={isOpened? 'chevron-up' : 'chevron-down'} type='font-awesome-5' color={'black'} size={18} />
                    }}
                    dropdownIconPosition={'right'}
                />
            </View>
            <Input
                label='Área disponível em m²'
                inputContainerStyle={styles.inputContainerStyle}
                inputStyle={styles.inputStyle}
                containerStyle={styles.containerStyle}
                keyboardType='number-pad'
            />
            <Input
                label='Distância entre Módulo e Inversor'
                inputContainerStyle={styles.inputContainerStyle}
                inputStyle={styles.inputStyle}
                containerStyle={styles.containerStyle}
                keyboardType='number-pad'
            />
            <Input
                label='Tarifa Energética'
                inputContainerStyle={styles.inputContainerStyle}
                inputStyle={styles.inputStyle}
                containerStyle={styles.containerStyle}
                keyboardType='number-pad'
            />
            <View style={{width: '100%', padding: 10}}>
                <SelectDropdown
                    data={[
                        {optionName: 'CEDRAP', value: '4c87b313-8a48-4932-8ada-348694c5e00f'},
                        {optionName: 'CEDRI', value: 'db7d7d0a-9a63-4236-a9df-f12ba638e0c3'},
                        {optionName: 'CEMIRIM', value: '381ba55f-3a7f-4220-aee4-79eab4cfc375'},
                        {optionName: 'CERIM', value: '4a8a844f-53b4-4dfa-bbd5-ee2e14d51ae5'},
                        {optionName: 'CERIPA', value: '355c7566-60b3-44d1-beb3-bd3e389773b3'},
                        {optionName: 'CERIS', value: 'b65aceba-a049-458a-92ba-244c226fee64'},
                        {optionName: 'CERMC', value: '1f6eaa31-ac78-408e-bb59-1c8ec6f07581'},
                        {optionName: 'CERNHE', value: '7ec72ebd-84f5-482f-9c5c-66d4fa4def07'},
                        {optionName: 'CERPRO', value: '843df132-da82-4ede-89a9-7c32990ae3e8'},
                        {optionName: 'CERRP', value: '15d6a5d8-9b08-4d6a-aa5c-2d1ad0971495'},
                        {optionName: 'CERVAM', value: '935cf3f0-40a4-45a1-81ac-a08ade335bd0'},
                        {optionName: 'CETRIL', value: 'f2df6d03-9998-4f60-950e-7ca454f864f9'},
                        {optionName: 'CPFL PAULISTA', value: '12b215e8-4999-464f-a852-5e14098b46ea'},
                        {optionName: 'CPFL PIRATININGA', value: 'ee669dc6-6e58-4a39-8568-0e7d1742717e'},
                        {optionName: 'CPFL SANTA CRUZ (NOVA)', value: 'cdba8259-7dd7-42a7-a745-ea63f74b7590'},
                        {optionName: 'EDP SP', value: 'b8d6ce46-af67-45e3-8e84-4b9da80aa45e'},
                        {optionName: 'ELEKTRO', value: '8d8235df-4c1e-4b7b-96f0-d17d9d853d3f'},
                        {optionName: 'ELETROPAULO', value: '3dabd4bc-80f1-447e-af22-8e9baf8bd007'},
                        {optionName: 'ENERGISA SUL-SUDESTE', value: '9f750ebd-e1b5-48d1-8230-06ce0a719b78'},
                        {optionName: 'SUL SUDESTE', value: 'd2c2bcfe-d6e5-4791-94e6-4ebae67e20cf'},
                        {optionName: 'TESTE TI', value: 'c3903381-18df-4bc8-81ab-c15a190d4095'}
                    ]}
                    onSelect={(selectedItem, index) => {
                        // console.log(selectedItem, index)
                    }}
                    buttonTextAfterSelection={(item, index) => {
                        return `Concessionária: ${item.optionName}`
                    }}
                    rowTextForSelection={(item, index) => {
                        return item.optionName
                    }}
                    buttonStyle={styles.dropdown2BtnStyle}
                    buttonTextStyle={styles.dropdown2BtnTxtStyle}
                    dropdownStyle={styles.dropdown2DropdownStyle}
                    rowStyle={styles.dropdown2RowStyle}
                    rowTextStyle={styles.dropdown2RowTxtStyle}
                    selectedRowStyle={styles.dropdown2SelectedRowStyle}
                    defaultButtonText='Concessionária:'
                    renderDropdownIcon={isOpened => {
                        return <Icon name={isOpened? 'chevron-up' : 'chevron-down'} type='font-awesome-5' color={'black'} size={18} />
                    }}
                    dropdownIconPosition={'right'}
                />
            </View>
            <Input
                label='Consumo médio em kWh/Mês'
                inputContainerStyle={styles.inputContainerStyle}
                inputStyle={styles.inputStyle}
                containerStyle={styles.containerStyle}
                keyboardType='number-pad'
            />
            <View style={{width: '100%', padding: 10}}>
                <SelectDropdown
                    data={[
                        {optionName: 'Mensal', value: 'monthly'},
                        {optionName: 'Médio', value: 'average'}
                    ]}
                    onSelect={(selectedItem, index) => {
                        // console.log(selectedItem, index)
                    }}
                    buttonTextAfterSelection={(item, index) => {
                        return `Inserir consumo: ${item.optionName}`
                    }}
                    rowTextForSelection={(item, index) => {
                        return item.optionName
                    }}
                    buttonStyle={styles.dropdown2BtnStyle2}
                    buttonTextStyle={styles.dropdown2BtnTxtStyle}
                    dropdownStyle={styles.dropdown2DropdownStyle}
                    rowStyle={styles.dropdown2RowStyle}
                    rowTextStyle={styles.dropdown2RowTxtStyle}
                    selectedRowStyle={styles.dropdown2SelectedRowStyle}
                    defaultButtonText='Inserir consumo:'
                    renderDropdownIcon={isOpened => {
                        return <Icon name={isOpened? 'chevron-up' : 'chevron-down'} type='font-awesome-5' color={'black'} size={18} />
                    }}
                    dropdownIconPosition={'right'}
                />
                <SelectDropdown
                    data={[
                        {optionName: 'Norte', value: 'norte'},
                        {optionName: 'Sul', value: 'sul'},
                        {optionName: 'Leste', value: '03106680-8959-4d20-8aeb-fced22190e7c'},
                        {optionName: 'Oeste', value: 'oeste'},
                    ]}
                    onSelect={(selectedItem, index) => {
                        // console.log(selectedItem, index)
                    }}
                    buttonTextAfterSelection={(item, index) => {
                        return `Orientações do Telhado: ${item.optionName}`
                    }}
                    rowTextForSelection={(item, index) => {
                        return item.optionName
                    }}
                    buttonStyle={styles.dropdown2BtnStyle}
                    buttonTextStyle={styles.dropdown2BtnTxtStyle}
                    dropdownStyle={styles.dropdown2DropdownStyle}
                    rowStyle={styles.dropdown2RowStyle}
                    rowTextStyle={styles.dropdown2RowTxtStyle}
                    selectedRowStyle={styles.dropdown2SelectedRowStyle}
                    defaultButtonText='Orientações do Telhado:'
                    renderDropdownIcon={isOpened => {
                        return <Icon name={isOpened? 'chevron-up' : 'chevron-down'} type='font-awesome-5' color={'black'} size={18} />
                    }}
                    dropdownIconPosition={'right'}
                />
            </View>
            
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      width: '100%',
      paddingLeft: 10,
      paddingRight: 10
    },
    topicItem: {
        margin: 10,
        color: 'white',
        borderRadius: 10,
        padding: 10,
        textAlign: 'center',
        backgroundColor: '#1b8eb7'
    },
    containerStyle: {
        marginBottom: -15
    },
    inputContainerStyle: {
        borderWidth: 1,
        borderStyle: 'solid',
        borderRadius: 7, 
        marginTop: 5,
        paddingLeft: 10,
        height: 50,
        backgroundColor: 'white'
    },
    inputStyle: {
        color: 'gray',
    },
    mb: {
        marginBottom: 10
    },
    dropdown2BtnStyle: {
        width: '100%',
        height: 50,
        backgroundColor: '#FFF',
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#444'
    },
    dropdown2BtnStyle2: {
        width: '100%',
        height: 50,
        backgroundColor: '#FFF',
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#444',
        marginBottom: 20
    },
    dropdown2BtnTxtStyle: {
        color: 'gray',
        textAlign: 'left',
        fontWeight: 'bold',
        fontSize: 16
    },
    dropdown2DropdownStyle: {
        backgroundColor: '#444',
        borderRadius: 12,
    },
    dropdown2RowStyle: {
        backgroundColor: '#444', 
        borderBottomColor: '#C5C5C5'
    },
    dropdown2RowTxtStyle: {
      color: '#FFF',
      textAlign: 'left',
      fontWeight: 'bold',
    },
    dropdown2SelectedRowStyle: {
        backgroundColor: 'rgba(255,255,255,0.2)'
    },
    dropdown2searchInputStyleStyle: {
      backgroundColor: '#444',
      borderBottomWidth: 1,
      borderBottomColor: '#FFF',
    },
  });
  