import { date2yyyymmdd } from '../../lib/date-transformer';
import React, { PropTypes, Component } from 'react';
import { View, Text } from 'react-native';

class PublishDate extends Component {

  render() {
    const { date } = this.props;
    let fDate = date2yyyymmdd(date, '/');

    return (
      <View>
        <Text>
          {fDate}
        </Text>  
      </View>
    );
  }  
}

PublishDate.propTypes = {
  date: PropTypes.string.isRequired
};


export default PublishDate;
