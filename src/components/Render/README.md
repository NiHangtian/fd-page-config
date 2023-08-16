<!--
 * @Author: 倪航天
 * @Date: 2023-07-31 23:06:53
 * @LastEditTime: 2023-08-16 23:49:03
 * @LastEditors: 倪航天
 * @Description: 
-->
##页面配置化 
核心思路：通过一段有规则的json 渲染出表单页面 

具体的规则产看 src/components/Render/typing.d.ts 
{
    "type": "form",
    "style": {
        "margin": "10px"
    },
    "layout": {
        "type": "Row"
    },
    "modules": [
        {
            "id": "100001", // 唯一ID
            "cmpId": "input", // 组建名称ID
            "cmpOptions": {
                "field": {  
                    "value": "data.labelMap.name", //路径获取   可以是个对象
                    "staticValue": "名称",  // 固定值 
                    "valueEnum": {  //枚举值
                        "靓仔": "吊毛"
                    },
                    "filterName": "filterValue"  //规律函数名称 由外部传入
                },
                "styles": {}, // css
                "required": true,  //必填校验
                "label": {  // form label   可以 label:"名称" 这么写
                    "text": "名称",
                    "styles": {},
                    "tip": {
                        "text": "这是注释",
                        "styles": {}
                    }
                },
                "layout": {  //珊格布局
                    "type": "Col",
                    "span": "12"
                },
                "initialValue": "默认名称", 默认值权重最大  initialValue>field.value>field.staticValue
                "props": {
                    "desc": "props里面放着各自组建的参数"
                }
            },
            "cmpRules": {
                "readonlyRule": [
                    {
                        "ruleList": [
                            {
                                "current": {  //与field 相同 也可以是 field[] 数组
                                    "staticValue": "名称"
                                }, 
                                "operator": "in", // != == in notIn 4种对比方式
                                "compare": [  //与field 相同 也可以是 field[] 数组
                                    {
                                        "value": "data.labelMap.name"
                                    }
                                ]
                            }
                        ],
                        "rule": "&&  ||  !&&   !|| 4种规则"
                    }
                ],
                "showRule": [], //与 readonlyRule 相同 
                "disabledRule": [] //与 readonlyRule 相同 
            },
            "modules": [] 
        }
    ]
}