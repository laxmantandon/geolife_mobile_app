import React, { useState } from "react";
import { View, Text, FlatList, TouchableOpacity } from "react-native";

const TreeView = ({ data }) => {
  const [expandedItems, setExpandedItems] = useState([]);

  const toggleExpand = (item) => {
    if (item.expandable) {
      if (expandedItems.includes(item.value)) {
        setExpandedItems(expandedItems.filter((value) => value !== item.value));
      } else {
        setExpandedItems([...expandedItems, item.value]);
      }
    }
  };

  const renderItem = ({ item }) => (
    <View>
      <TouchableOpacity onPress={() => toggleExpand(item)}>
        <Text>{item.title}</Text>
      </TouchableOpacity>
      {expandedItems.includes(item.value) && item.expandable ? (
        <TreeView data={data.find((d) => d.parent === item.value)?.data} />
      ) : null}
    </View>
  );

  return (
    <FlatList
      data={data}
      keyExtractor={(item) => item.value}
      renderItem={renderItem}
    />
  );
};

export default TreeView;
