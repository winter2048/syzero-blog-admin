<template>
  <mavon-editor v-model="value"
                :ishljs="true"
                :boxShadow="false"
                @change="updateDoc"
                @imgAdd="$imgAdd"
                :externalLink="externalLink"
                codeStyle="agate"
                ref=md />
</template>

<script>
import { mavonEditor } from 'mavon-editor'
import { Upload } from '../../api/Upload.js'
import 'mavon-editor/dist/css/index.css'
export default {
  name: 'mavon-mde',
  props: {
    // 值
    value: {
      type: String,
      required: false,
      default: ''
    },
    // 配置参数
    config: {
      type: Object,
      required: false,
      default: () => ({})
    }
  },
  components: { mavonEditor },
  data () {
    return {
      // 编辑器实例
      mde: null,
      // 编辑器默认参数
      // 详见 https://github.com/sparksuite/simplemde-markdown-editor#configuration
      defaultConfig: {
        autoDownloadFontAwesome: false
      },
      externalLink: {
        markdown_css: function () {
          // 这是你的代码高亮配色文件路径
          return 'https://cdn.bootcdn.net/ajax/libs/github-markdown-css/2.9.0/github-markdown.min.css';
        },
          hljs_css: function(css) {
          // 这是你的代码高亮配色文件路径
          return 'https://cdn.bootcdn.net/ajax/libs/highlight.js/9.12.0/styles/' + css + '.min.css';
        },
        hljs_js: function () {
          // 这是你的hljs文件路径
          return 'https://cdn.bootcdn.net/ajax/libs/highlight.js/9.12.0/highlight.min.js';
        },
        hljs_lang: function (lang) {
          // 这是你的代码高亮语言解析路径
          return 'https://cdn.bootcdn.net/ajax/libs/highlight.js/9.12.0/languages/' + lang + '.min.js';
        },
        katex_css: function () {
          // 这是你的katex配色方案路径路径
          return 'https://cdn.bootcdn.net/ajax/libs/KaTeX/0.8.3/katex.min.css';
        },
        katex_js: function () {
          // 这是你的katex.js路径
          return 'https://cdn.bootcdn.net/ajax/libs/KaTeX/0.8.3/katex.min.js';
        }
      }
    }
  },
  mounted () {
    // 初始化
    // this.init()
  },
  destroyed () {
    // 在组件销毁后销毁实例
    // this.mde = null
  },
  watch: {
    // 对外提供 v-model
    value: {
      handler (val) {
        // if (this.mde != null && this.mde.value() !== val) {
        //   this.mde.value(val)
        // }
        this.value = val
      },
      immediate: true
    }
  },
  methods: {
    updateDoc (markdown, html) {
      // 此时会自动将 markdown 和 html 传递到这个方法中
      this.$emit('input', markdown)
    },
    // 绑定@imgAdd event
    $imgAdd (pos, $file) {
      // 第一步.将图片上传到服务器.
      var formdata = new FormData()
      formdata.append('image', $file)
      Upload(formdata).then((url) => {
        // 返回图片地址
        this.$refs.md.$img2Url(pos, url)
      })
    }
  }
}
</script>
<style >

.v-note-wrapper {
  border: 1px solid #dcdfe6 !important;
}
</style>
