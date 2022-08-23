## Vue图片上传和简单的视频播放组件
### 图片上传模块

![image-20220704170418414](https://pic-1300230199.cos.ap-guangzhou.myqcloud.com/NewPic/image-20220704170418414.png)

支持点击和拖拽上传

支持转为Blob和Base64

同时提供对应测试[后端](https://github.com/eq1024/vue-com-node),开启后直接向`http:localhost:2714/upload`发送post请求,即可解析`formdata`数据,自动保存图片

| 参数          | 类型     | 默认数据                                             | 说明                               |
| :------------ | -------- | ---------------------------------------------------- | ---------------------------------- |
| action(必选)  | String   | 无                                                   | 上传地址                           |
| size          | Number   | 1\*1024\*1024                                        | 允许上传文件最大值                 |
| limit         | Number   | 3                                                    | 允许上传最大文件数                 |
| multiple      | Boolean  | false                                                | 是否允许多选上传                   |
| blob          | Boolean  | true                                                 | 本地显示时是采用内存blob还是base64 |
| types         | Array    | ['image/png','image/jpeg','image/gif']               | 允许上传的图片类型,如:image/png    |
| eqstyle       | String   | 无                                                   | 单个图片盒子样式,使用css即可       |
| equploaded    | Function | 默认传入一个参数(上传成功的文件)                     | 上传完成触发                       |
| before-remove | Function | 默认传入三个参数(被删除文件,对应序列号,全部文件列表) | 删除前执行,返回false则停止删除     |

### 视频播放组件

封装自`vediojs`

![image-20220704173247821](https://pic-1300230199.cos.ap-guangzhou.myqcloud.com/NewPic/image-20220704173247821.png)

| 参数       | 类型    | 默认数据 | 说明       |
| ---------- | ------- | -------- | ---------- |
| src(必选)  | String  | 无       | 视频地址   |
| type(必选) | String  | 无       | 视频类型   |
| controls   | Boolean | true     | 控制器显示 |
| height     | Nnmber  | 400(px)  | 播放器高度 |
| width      | Nnmber  | 600(px)  | 播放器宽度 |





​      
