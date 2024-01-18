import { Text, TouchableHighlight, View } from "react-native";
import { styles, underlayColor } from "../styles";

export default function ListItem({ label, onPress, children, ...rest }) {
  return (
    <>
      <View style={{flex: 1}}>
        <TouchableHighlight style={styles.settingsItem} underlayColor={underlayColor} onPress={onPress}>
          <>
            <View style={{flex: 2, alignItems: 'flex-start'}}>
              <Text style={styles.settingsListItem}>{label}</Text>
            </View>
            {children ?
                <View style={{flex: 1, alignItems: 'flex-end', justifyContent: 'center'}}>
                  {children}
                </View>
              : null}
            </>
        </TouchableHighlight>
      </View>
    </>
  )
}