let application = function () {
    // 私有变量和私有函数
    let components = new Array();
    // 初始化
    components.push(new BaseComponent());
    // 创建局部变量保存实例 
    let app = new BaseComponent();
    // 公共接口
    app.getComponentCount = function () {
        return components.length;
    };
    app.registerComponent = function (component) {
        if (typeof component == "object") {
            components.push(component);
        }
    };
    // 返回实例
    return app;
}();