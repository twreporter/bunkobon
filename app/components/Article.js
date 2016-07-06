import React, { PropTypes, Component } from 'react';
import { ActivityIndicator, ScrollView, View, Text, StyleSheet } from 'react-native';
import _ from 'lodash';

import HtmlRender from 'react-native-html-render';

import HeadingAuthor from './HeadingAuthor';

class Article extends Component {
  componentWillMount() {
    const { route, loadArticle } = this.props;
    loadArticle(route.article.slug);
  }

  componentWillReceiveProps(nextProps) {
    const { route, loadArticle } = nextProps;
    if (this.props.route.article.slug !== nextProps.route.article.slug) {
      loadArticle(route.article.slug);
    }
  }

  _composeAuthors(article = {}) {
    const authors = [];
    const list = ['writters', 'photographers', 'designers', 'engineers'];
    list.forEach((item) => {
      if (Array.isArray(article[item])) {
        article[item].forEach((author) => {
          // remove 's'. writters -> writter
          const type = item.slice(0, -1);
          authors.push(_.merge({}, author, { type }));
        });
      }
    });
    return authors;
  }


  render() {
    const { article } = this.props;

    if (!article.loaded) {
      return (
        <View style={styles.center}>
          <ActivityIndicator />
        </View>
      );
    }

    const authors = this._composeAuthors(article);

    return (
      <ScrollView style={styles.container}>
        <View>
          <Text style={styles.titleText}>{article.title}</Text>
        </View>
        <HeadingAuthor authors={authors} />
        <View style={styles.content}>
          <HtmlRender
            onLinkPress={() => {}}
            value={article.content.extended.html}
          />
        </View>
      </ScrollView>
    );
  }
}

Article.propTypes = {
  route: PropTypes.object.isRequired,
  article: PropTypes.object.isRequired,
  loadArticle: PropTypes.func.isRequired,
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

export default Article;
