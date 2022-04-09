import React, { FC, useEffect, useState } from "react";
import {
  FlatList,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import FoodCard from "../../components/home/FoodCard";
import DefaultImage from "../../components/ui/DefaultImage";
import { COLORS } from "../../constants/colors";
import { dummy_categories, dummy_menu } from "../../constants/dummydata";
import { FONTS } from "../../constants/fonts";
import { SIZES } from "../../constants/sizes";
import { Menu, MenuDetail } from "../../model/Menu";
import HomeFilter from "./HomeFilter";

const HomeSearch: FC<{ onFilter: () => void }> = (props) => {
  return (
    <View style={styles.searchContainer}>
      <DefaultImage
        width={20}
        height={20}
        source={require("../../../assets/images/search.png")}
        containerStyle={{ tintColor: COLORS.black }}
      />
      <TextInput
        style={{ flex: 1, marginLeft: SIZES.radius, ...FONTS.body3 }}
        placeholder="search food ..."
      />
      <TouchableOpacity onPress={props.onFilter}>
        <DefaultImage
          width={20}
          height={20}
          source={require("../../../assets/images/filter.png")}
          containerStyle={{ tintColor: COLORS.black }}
        />
      </TouchableOpacity>
    </View>
  );
};

const HomeSection: FC<{ title: string; onPress: () => void }> = (props) => {
  return (
    <View>
      <View
        style={{
          flexDirection: "row",
          marginHorizontal: SIZES.padding,
          marginTop: 30,
          marginBottom: 20,
        }}
      >
        <Text style={{ flex: 1, ...FONTS.h3 }}>{props.title}</Text>
        <TouchableOpacity onPress={props.onPress}>
          <Text style={{ color: COLORS.primary, ...FONTS.body3 }}>
            Show all
          </Text>
        </TouchableOpacity>
      </View>
      {props.children}
    </View>
  );
};

const Home = () => {
  const [selectedCategoryId, setSelectedCategoryId] = useState(1);
  const [selectedMenuType, setSelectedMenuType] = useState(1);
  const [menuList, setMenuList] = useState<MenuDetail[]>([]);
  const [recommendList, setRecommendList] = useState<MenuDetail[]>([]);
  const [popularList, setPopularList] = useState<MenuDetail[]>([]);
  const [showFilter, setShowFilter] = useState<boolean>(false);

  const onChangeCategory = (categoryId: number, menuType: number) => {
    let selectedPopular = dummy_menu.find((menu) => menu.name === "Popular");

    let selectedRecommend = dummy_menu.find(
      (menu) => menu.name === "Recommended"
    );

    let selectedMenu = dummy_menu.find((menu) => menu.id === menuType);

    if (selectedPopular) {
      setPopularList(
        selectedPopular.list.filter((popular) =>
          popular.categories.includes(categoryId)
        )
      );
    }

    if (selectedRecommend) {
      setRecommendList(
        selectedRecommend.list.filter((recommend) =>
          recommend.categories.includes(categoryId)
        )
      );
    }

    if (selectedMenu) {
      setMenuList(
        selectedMenu.list.filter((menu) => menu.categories.includes(categoryId))
      );
    }
  };

  useEffect(() => {
    onChangeCategory(selectedCategoryId, selectedMenuType);

    return () => {};
  }, []);

  const renderDelivery = () => {
    return (
      <View
        style={{
          marginVertical: SIZES.padding,
          marginHorizontal: SIZES.padding,
        }}
      >
        <Text style={{ color: COLORS.primary, ...FONTS.body3 }}>
          DELIVERY TO
        </Text>
        <TouchableOpacity
          style={{
            flexDirection: "row",
            marginTop: SIZES.base,
            alignItems: "center",
          }}
        >
          <Text style={FONTS.h3}>abc</Text>
          <DefaultImage
            width={20}
            height={20}
            containerStyle={{ marginLeft: SIZES.base }}
            source={require("../../../assets/images/down_arrow.png")}
          />
        </TouchableOpacity>
      </View>
    );
  };

  const renderCategories = () => {
    return (
      <FlatList
        horizontal
        data={dummy_categories}
        keyExtractor={(item) => item.id.toString()}
        showsHorizontalScrollIndicator={false}
        renderItem={({ item, index }) => {
          return (
            <TouchableOpacity
              style={{
                flexDirection: "row",
                alignItems: "center",
                height: 55,
                marginLeft: index === 0 ? SIZES.padding : SIZES.radius,
                marginRight:
                  index === dummy_categories.length - 1 ? SIZES.padding : 0,
                paddingHorizontal: 8,
                borderRadius: SIZES.radius,
                backgroundColor:
                  selectedCategoryId === item.id
                    ? COLORS.primary
                    : COLORS.lightGray2,
              }}
              onPress={() => {
                setSelectedCategoryId(item.id);
                onChangeCategory(item.id, selectedMenuType);
              }}
            >
              <DefaultImage width={50} height={50} source={item.icon} />
              <Text
                style={{
                  alignSelf: "center",
                  marginRight: SIZES.base,
                  color:
                    selectedCategoryId === item.id
                      ? COLORS.white
                      : COLORS.darkGray,
                  ...FONTS.h3,
                }}
              >
                {item.name}
              </Text>
            </TouchableOpacity>
          );
        }}
      />
    );
  };

  const renderPopularSection = () => {
    return (
      <HomeSection title="Popular" onPress={() => {}}>
        <FlatList
          data={popularList}
          keyExtractor={(item) => item.id.toString()}
          horizontal
          showsHorizontalScrollIndicator={false}
          renderItem={({ item, index }) => (
            <FoodCard
              vertical
              containerStyle={{
                marginLeft: index === 0 ? SIZES.padding : 18,
                marginRight:
                  index === recommendList.length - 1 ? SIZES.padding : 0,
              }}
              imageWidth={150}
              imageHeight={150}
              imageStyle={{ marginTop: 35 }}
              onPress={() => {}}
              item={item}
            />
          )}
        />
      </HomeSection>
    );
  };

  const renderRecommendSection = () => {
    return (
      <HomeSection title="Recommend" onPress={() => {}}>
        <FlatList
          data={recommendList}
          keyExtractor={(item) => item.id.toString()}
          horizontal
          showsHorizontalScrollIndicator={false}
          renderItem={({ item, index }) => (
            <FoodCard
              containerStyle={{
                height: 180,
                width: SIZES.width * 0.85,
                marginLeft: index === 0 ? SIZES.padding : 18,
                marginRight:
                  index === recommendList.length - 1 ? SIZES.padding : 0,
                paddingRight: SIZES.radius,
                alignItems: "center",
              }}
              imageWidth={150}
              imageHeight={150}
              imageStyle={{ marginTop: 35 }}
              onPress={() => {}}
              item={item}
            />
          )}
        />
      </HomeSection>
    );
  };

  const renderMenuTypes = () => {
    return (
      <FlatList
        horizontal
        data={dummy_menu}
        keyExtractor={(item) => item.id.toString()}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{
          marginTop: 30,
          marginBottom: 20,
        }}
        renderItem={({ item, index }) => (
          <TouchableOpacity
            style={{
              marginLeft: SIZES.padding,
              marginRight: index === dummy_menu.length - 1 ? SIZES.padding : 0,
            }}
            onPress={() => {
              setSelectedMenuType(item.id);
              onChangeCategory(selectedCategoryId, item.id);
            }}
          >
            <Text
              style={{
                color:
                  selectedMenuType === item.id ? COLORS.primary : COLORS.black,
                ...FONTS.h3,
              }}
            >
              {item.name}
            </Text>
          </TouchableOpacity>
        )}
      />
    );
  };

  return (
    <View style={styles.container}>
      <HomeSearch onFilter={() => setShowFilter(true)} />
      {showFilter && (
        <HomeFilter
          isVisible={showFilter}
          onClose={() => setShowFilter(false)}
        />
      )}
      <FlatList
        data={menuList}
        keyExtractor={(item) => item.id.toString()}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={
          <View>
            {renderDelivery()}
            {renderCategories()}
            {renderPopularSection()}
            {renderRecommendSection()}
            {renderMenuTypes()}
          </View>
        }
        renderItem={({ item, index }) => (
          <FoodCard
            containerStyle={{
              height: 130,
              alignItems: "center",
              marginHorizontal: SIZES.padding,
              marginVertical: SIZES.radius,
            }}
            imageWidth={110}
            imageHeight={110}
            imageStyle={{ marginTop: 20 }}
            onPress={() => {}}
            item={item}
          />
        )}
        ListFooterComponent={<View style={{ height: 200 }} />}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  searchContainer: {
    flexDirection: "row",
    height: 40,
    alignItems: "center",
    marginHorizontal: SIZES.padding,
    marginVertical: SIZES.base,
    paddingHorizontal: SIZES.radius,
    borderRadius: SIZES.radius,
    backgroundColor: COLORS.lightGray2,
  },
});

export default Home;
