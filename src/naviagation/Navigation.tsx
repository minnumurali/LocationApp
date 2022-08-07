import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Home from "../screens/Home";

const { Navigator, Screen } = createBottomTabNavigator();

const options = {
  headerShown: false,
};

const Navigation: React.FC = () => {
  return (
    <NavigationContainer>
      <Navigator>
        <Screen name="Home" component={Home} 
       

         options={{
              tabBarStyle: { display: "none" },
              headerShown: false
            }} />
      </Navigator>
    </NavigationContainer>
  );
};

export default Navigation;
