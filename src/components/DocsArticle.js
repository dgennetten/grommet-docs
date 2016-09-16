// (C) Copyright 2014-2016 Hewlett Packard Enterprise Development LP

import React, { Component, PropTypes } from 'react';
import { findDOMNode } from 'react-dom';
import Article from 'grommet/components/Article';
import Header from 'grommet/components/Header';
import Box from 'grommet/components/Box';
import { announcePageLoaded } from 'grommet/utils/Announcer';
import DocsFooter from './DocsFooter';

const DEFAULT_TITLE = 'Grommet';

//hjjs configuration
const hljs = require('highlight.js/lib/highlight');
hljs.registerLanguage('bash', require('highlight.js/lib/languages/bash'));
hljs.registerLanguage('xml', require('highlight.js/lib/languages/xml'));
hljs.registerLanguage('javascript',
  require('highlight.js/lib/languages/javascript'));
hljs.registerLanguage('scss', require('highlight.js/lib/languages/scss'));

export default class DocsArticle extends Component {
  constructor (props) {
    super(props);
    this._highlightCode = this._highlightCode.bind(this);
  }

  componentDidMount () {
    this._highlightCode();
    if (this.props.title) {
      document.title = `${this.props.title} | Grommet`;
    } else {
      document.title = DEFAULT_TITLE;
    }
    announcePageLoaded(this.props.title || DEFAULT_TITLE);
  }

  componentDidUpdate () {
    this._highlightCode();
  }

  _highlightCode () {
    var codeBlocks = document.querySelectorAll('code.html.xml.hljs');
    codeBlocks.forEach((codeBlock) => {
      hljs.highlightBlock(codeBlock);
    });
  }

  render () {
    const { action, context, full, title } = this.props;
    let pad;
    if (! full) {
      pad = {horizontal: 'large'};
    }
    return (
      <Article className="docs-article" primary={true}>
        <Header size="large" pad={{horizontal: 'large'}}
          colorIndex={this.props.colorIndex} justify="between">
          <h1>{context} {title}</h1>
          {action}
        </Header>
        <Box ref='content' pad={pad}>
          {this.props.children}
        </Box>
        <DocsFooter />
      </Article>
    );
  }
};

DocsArticle.propTypes = {
  action: PropTypes.node,
  colorIndex: PropTypes.string,
  context: PropTypes.element,
  full: PropTypes.bool,
  title: PropTypes.string.isRequired
};

DocsArticle.defaultProps = {
  colorIndex: 'neutral-1'
};
