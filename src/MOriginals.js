import { View, Text, StyleSheet, FlatList, Dimensions, Image,TouchableOpacity, ScrollView, Button} from 'react-native'
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import {decode} from 'html-entities';
import Icon from 'react-native-vector-icons/AntDesign';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../redux/userSlice';
// import Carousel from 'react-native-snap-carousel';


let deviceWidth = Dimensions.get('window').width;
let deviceHeight = Dimensions.get('window').height;

const MOriginals = ({navigation}) => {
  
  const dispatch = useDispatch();
 
     const[view, setView] = useState([]);
   
    const signout = () =>{
      console.log("dispatch singout ",dispatch);
      dispatch(logout());
      navigation.replace('Login');
    }
    

    const mOriginalApi = () =>{
        axios.post("https://api.mcontent.net/system/api/moriginals-layoutwebbearer").then((response)=>{
            setView(response.data.data);
        }).catch((err)=>console.log(err));
    }
    useEffect(()=>{
        mOriginalApi();
    },[])
    // console.log("VSLIDER ", vslider);
  return (
    <ScrollView style={styles.container}>    
  
      <Button title="Logout" onPress={signout}/>
    
     {
        view.map((item, key)=>{
            // console.log("item template ", item.template);
            // console.log("Item data ", item.data)
            return (
                <View key={key}>
                {item.template === "vslider" ? 
                <FlatList
                horizontal
                showsHorizontalScrollIndicator={false}
                data={item.data}
                keyExtractor={(key)=>{
                    return key.id.$oid
                }}
                renderItem={(dta)=>{
                   
                    return(
                           <View
                    style={{
                      margin: 15,
                      marginTop: 10,
                      marginBottom: 10,
                      alignItems: 'flex-start',
                    width:deviceWidth
                     
                    }}>
                        
                    <TouchableOpacity
                    
                      activeOpacity={0.5}>
                      <View style={{borderRadius: 10, alignItems: 'center'}}>
                        <Image
                          style={{
                            height: deviceHeight / 2,
                            borderRadius: 4,
                            borderBottomLeftRadius: 0,
                            borderBottomRightRadius: 0,
                            width: deviceWidth - 30,
                          }}
                          source={{uri: dta.item.vposter}}
                        />
                        <View
                          style={{
                            backgroundColor: 'rgba(0,0,0,0.8)',
                            alignItems: 'center',
                            flexDirection: 'row',
                            width: '100%',
                            height: 60,
                            padding: 10,
                            bottom: 0,
                            borderBottomLeftRadius: 4,
                            borderBottomRightRadius: 4,
                          }}>
                          <Icon
                            name={'play'}
                            color={'white'}
                            size={24}
                            style={{}}
                          />
                          <Text
                            numberOfLines={2}
                            style={{
                              color: 'white',
                              fontFamily: 'Mulish-SemiBold',
                              fontSize: 11,
                              marginLeft: 10,
                              width: '70%',
                            }}>
                            {decode(dta.item.title)}
                          </Text>
                        </View>
                      </View>
                    </TouchableOpacity>
                  </View>
                    )
                }}
                
                />

                : item.template === "hslider" ? 
                <View>
                    <Text style={styles.title}>{item.title}</Text>
                <FlatList
                horizontal
                showsHorizontalScrollIndicator={false}
                data={item.data}
                keyExtractor={(key)=>{
                    return key.id.$oid
                }}
                renderItem={(dta)=>{
                    
                    return(
                        <View style={{margin: 10}}>
                                
                                       <TouchableOpacity
                                
                                          activeOpacity={0.5}>
                                          <View style={{borderRadius: 20}}>
                                            {dta.item.hposter != null ? (
                                              <Image
                                                style={{height: 100, borderRadius: 10, width: 178}}
                                                source={{uri: dta.item.hposter}}
                                              />
                                            ) : (
                                              <View
                                                style={{
                                                  height: 120,
                                                  borderRadius: 10,
                                                  width: 180,
                                                  backgroundColor: 'lightgrey',
                                                }}
                                              />
                                            )}
                                          </View>
                                        </TouchableOpacity>
                                      </View>
                    )
                }}
                
                />
</View>

                
                : item.template === "vslidert" ? 
                <View>
                     <Text style={styles.title}>{item.title}</Text>
                <FlatList
                horizontal
                showsHorizontalScrollIndicator={false}
                data={item.data}
                keyExtractor={(key)=>{
                    return key.id.$oid
                }}
                renderItem={(dta)=>{
                    
                    return(
                        <View style={{marginHorizontal: 6, marginVertical: 10}}>
                    
                          <TouchableOpacity
                            //   onPress={() => this.navigate(item.movie_url, item)}
                              activeOpacity={0.5}>
                              <View style={{borderRadius: 20}}>
                                <Image
                                  style={{height: 180, borderRadius: 10, width: 120}}
                                  source={{uri: dta.item.hposter}}
                                />
                              </View>
                            </TouchableOpacity>
                            <View
                              style={{
                                flexDirection: 'row',
                                position: 'absolute',
                                bottom: 0,
                                backgroundColor: 'rgba(0,0,0,0.5)',
                                width: '100%',
                                borderBottomEndRadius: 10,
                                borderBottomStartRadius: 10,
                              }}>
                              <View style={{alignItems: 'flex-start', padding: 5}}>
                                <Text
                                  style={{
                                    fontSize: 10,
                                    fontFamily: 'Mulish-SemiBold',
                                    fontWeight: 'bold',
                                    color: 'white',
                                    margin: 5,
                                    marginLeft: 0,
                                    flexWrap: 'wrap',
                                  }}
                                  numberOfLines={1}>
                                  {decode(dta.item.title)}
                                  {/* asduvwvdistvasavdtqyiwqvdiyvqwtvdyq */}
                                </Text>
                              </View>
                            </View>
                          </View>
                    )
                }}
                
                />
                </View>
                
                 : null
            }
             </View>
                )
        
               
        })
     }
    </ScrollView>
  );
};
const styles = StyleSheet.create({
container:{
    flex:1,
},
title:{
fontSize:18,
paddingVertical:5,
paddingHorizontal:10,
fontWeight:'bold',
color:'grey'
}
})

export default MOriginals