import React from 'react';
import {
    SafeAreaView,
    View,
    StyleSheet,
    Image,
    Text,
    Linking,
} from 'react-native';
import {
    DrawerContentScrollView,
    DrawerItemList,
    DrawerItem,
} from '@react-navigation/drawer';

const CustomSidebarMenu = (props) => {
    const BASE_PATH =
        'https://www.nicesnippets.com/image/nice-logo.png';

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <View style={{ marginTop: 40, }}>
                <Image
                    source={{ uri: BASE_PATH }}
                    style={styles.sideMenuProfileIcon}
                />
            </View>
            <DrawerContentScrollView {...props}>
                <DrawerItemList {...props}  />
                <DrawerItem
                    label="Visit Us"
                    onPress={() => Linking.openURL('https://www.nicesnippets.com/')}
                />
                <View style={styles.customItem}>
                    <Text
                        onPress={() => {
                            Linking.openURL('https://www.nicesnippets.com/');
                        }}
                    >
                        Rate Us
                    </Text>
                </View>
            </DrawerContentScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    sideMenuProfileIcon: {
        resizeMode: 'contain',
        width: '95%',
        height: 60,
    },
    customItem: {
        padding: 16,
        flexDirection: 'row',
        alignItems: 'center',
    },
});

export default CustomSidebarMenu;