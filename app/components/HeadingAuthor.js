import React, { PropTypes, Component } from 'react';
import _ from 'lodash';
import { View, Text, StyleSheet } from 'react-native';


class HeadingAuthor extends Component {

  _formatAuthor(authors) {
    const authorTypes = {
      'writter': '文',
      'photographer': '攝影',
      'designer': '設計',
      'engineer': '工程'
    };
    const authorSeparator = '、';
    const retAuthor = [];
    // organize the header author list by types
    for (const type in authorTypes) { // eslint-disable-line
      const curAuthors = [];    // store author of the same type
      authors.forEach((author) => {
        if (author.type === type) {
          curAuthors.push(author.name);
        }
      });
      if (curAuthors.length > 0) {
        retAuthor.push({
          type: authorTypes[type],
          list: curAuthors.join(authorSeparator)   // format the author list with '、'
        });
      }
    }
    return retAuthor;
  }

  render() {
    const { authors } = this.props;
    const formattedAuthor = this._formatAuthor(authors);
    let count = 0;

    const authorRows = _.map(formattedAuthor, author =>
      <Text key={count++} className={styles.authorItem}>
        {author.type} | {author.list}
      </Text>
    );

    return (
      <View>
				{authorRows}
      </View>
    );
  }
}

HeadingAuthor.propTypes = {
  authors: PropTypes.array.isRequired
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20
  },
  center: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    backgroundColor: '#fff'
  },
  titleText: {
    fontSize: 24,
    fontWeight: '600'
  }
});

export default HeadingAuthor;
