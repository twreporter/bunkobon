/* eslint no-unused-vars:0 */
import _ from 'lodash';
import React, { Component, PropTypes } from 'react';
import { View, Text, StyleSheet } from 'react-native';

export class BottomTags extends Component {

  render() {
    const { data } = this.props;
    // select distinct tags
    const tags = _.uniq(data, 'id');
    const tagList = _.map(tags, tag =>
      <Text key={tag._id}>
          {tag.name}
      </Text>
    );

    return (
      <View>
        {tagList}
      </View>
    )
  }
}

BottomTags.propTypes = {
  data : PropTypes.array.isRequired
};

export default BottomTags;
