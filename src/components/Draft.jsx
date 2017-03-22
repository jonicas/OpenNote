import React, {Component} from 'react';
import {Editor, EditorState, ContentState, RichUtils} from 'draft-js';

import './Draft.css';

import {
  BlockStyleControls, 
  InlineStyleControls, 
  getBlockStyle, 
  styleMap
} from './DraftControls';

class Draft extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      editorState: EditorState.createWithContent(ContentState.createFromText(props.note.text))
    };

    this.focus = () => this.refs.editor.focus();
    this.onChange = (editorState) => this.setState({editorState});

    // rich text
    this.handleKeyCommand = (command) => this._handleKeyCommand(command);
    this.onTab = (e) => this._onTab(e);
    this.toggleBlockType = (type) => this._toggleBlockType(type);
    this.toggleInlineStyle = (style) => this._toggleInlineStyle(style);
  }

  _handleKeyCommand(command) {
    const {editorState} = this.state;
    const newState = RichUtils.handleKeyCommand(editorState, command);
    if (newState) {
      this.onChange(newState);
      return true;
    }
    return false;
  }

  _onTab(e) {
    const maxDepth = 4;
    this.onChange(RichUtils.onTab(e, this.state.editorState, maxDepth));
  }

  _toggleBlockType(blockType) {
    console.log('ToggleBlockType:', blockType);    
    this.onChange(
      RichUtils.toggleBlockType(this.state.editorState, blockType)
    );
  }

  _toggleInlineStyle(inlineStyle) {
    console.log('ToggleInline:', inlineStyle);
    this.onChange(
      RichUtils.toggleInlineStyle(this.state.editorState, inlineStyle)
    );
  }

  _onBoldClick() {
    this.onChange(
      RichUtils.toggleInlineStyle(this.state.editorState, 'BOLD')
    );
  }

  render() {
    const {editorState} = this.state;
    let className = 'RichEditor-editor';
    const contentState = editorState.getCurrentContent();
    if (!contentState.hasText()) {
      if(contentState.getBlockMap().first().getType() !== 'unstyled') {
        className += ' RichEditor-hidePlaceholder';
      }
    }

    return (
      <div className="RichEditor-root">
        <div 
          className="RichEditor-editor RichEditor-hidePlaceholder" 
          onClick={this.focus}>
          <BlockStyleControls
            editorState={editorState}
            onToggle={this.toggleBlockType}
          />
          <InlineStyleControls 
            editorState={editorState}
            onToggle={this.toggleInlineStyle}
          />
          <Editor
            blockStyleFn={getBlockStyle}
            customStyleMap={styleMap}
            editorState={editorState} 
            onChange={this.onChange}
            onTab={this.onTab}
            ref="editor"
            spellCheck={true}
          />
        </div>
      </div>
    );
  }
}

export default Draft;