import { StyleSheet,Image, Text, View, Pressable, Button, TextInput } from 'react-native';
import { useState, useEffect} from "react"

// 1. TODO Import Map Library
// 2. (optional): Initial array of markers

export default function MapScreen() {    
    const [latFromUI, setLatFromUI] = useState("37.747830")
    const [lngFromUI, setLngFromUI] = useState("-122.494750")

    const addMarker = () => {
        alert("Add marker pressed")
    }

    return (
        <View style={styles.container}>
            {/* 3. MapView */}
            {/* 4. Marker */}
            <Text style={{fontSize:18, fontWeight:"bold"}}>Map</Text>


            {/* ui for adding a marker */}
            <Text style={{fontSize:18, fontWeight:"bold", marginTop:20}}>
                Add a Marker
            </Text>                 
            <TextInput style={styles.tb} keyboardType="numeric" value={latFromUI} onChangeText={setLatFromUI} placeholder="Enter latitude"/>  
            <TextInput style={styles.tb} keyboardType="numeric" value={lngFromUI} onChangeText={setLngFromUI} placeholder="Enter longitude"/>  
            <Pressable onPress={addMarker} style={styles.btn}>
                <Text style={styles.btnLabel}>Add Marker</Text>
            </Pressable>
        </View>
    );
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        padding:20
    },
    map: {
        height:"50%",
        width:"100%",                 
    },
    btn: {
        borderWidth:1,
        borderColor:"#141D21",
        borderRadius:8,
        paddingVertical:16,
        marginVertical:10
    }, 
    btnLabel: {
        fontSize:16,
        textAlign:"center"
    }, 
    tb: {
        width:"100%",   
        borderRadius:5,
        backgroundColor:"#efefef",
        color:"#333",
        fontWeight:"bold", 
        paddingHorizontal:10,
        paddingVertical:15,
        marginVertical:10,       
    },
});
