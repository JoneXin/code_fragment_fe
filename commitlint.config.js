module.exports = {
    extends: ['@commitlint/config-conventional'],
    rules: {
        'type-case': [2, 'always', ['lower-case', 'upper-case']],
        'type-enum': [2, 'always', ['feat', 'fix', 'docs', 'style', 'refactor', 'perf', 'test', 'chore', 'revert']]
    }
}

// feat: 新功能
// fix: 修复bug
// docs：只改动了文档
// style：修改代码格式（例如去掉空格、改变缩进、增删分号，不影响代码逻辑）
// refactor：重构代码（理论上不影响现有功能）
// perf：提升性能的改动
// test：增加修改测试用例
// chore：改变构建流程、或者增加依赖库、工具等
// revert：回滚到上一个版本
// ci：持续集成
// build：构建版本