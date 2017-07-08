# 图书信息
	{
		ID:001,//图书ID
		Name:'中学词汇', //书名
		Picture:'',//图书配图
		SumWordCount:10000,//收录总词汇量
	}
> 接口参数：
> 
> AuthID，用户ID
> 
> 返回：图书信息列表

# 词语列表目录
	{
		ID: 1001, //列表或节点的ID值
		Name:"核心词汇", //名称
		IsList: False, //是否为词汇列表
		HasPractice:False, //是否包含真题练习
		SunWordCount:40, //列表词汇量
		[Children]: [...]  //子级列表，可选
	}

> 接口参数：
> 
> BookID，图书ID
> 
> LoadExtra，是否加载Extra信息，自测时不需要这么多。

# 获取词汇信息
	{
		ID：3001,//单词ID
		Word:'accept',//单词本身
		ExamRate:'10',//考试次数
		Phonogram:'',//音标
		VoiceURL:'',//读音地址
		Explain:'',//汉语解释
		Extra:[ //其他解释列表
			{
				Title:'丽丽助记',
				Content:'',//解释类型
				ContentType:'',//内容类型
			}
		]
		
	}
> 接口参数：
> 
> ListID，列表ID
> 
> 返回：
> 词汇信息列表


# 真题信息
	{
		ID:2001,//真题ID
		From:"湖北黄石",//真题来源
		Content:"",//可能是HTML描述的，可能存在数据转换的难点。
		Options:[
			{
				KeyName:"A",
				Content:"", //选型内容可以是TEXT或H5表示
				ContentType:"",//
			}
			...
		],
        Answer:['r','w']
	}
> 接口参数：
> 
> ListID，真题列表ID
> 
> 返回：真题信息列表

# 广告接口
	{
		Title: // 标题信息
		Picture: //广告配图
		Button: //按钮显示的文本
		ActionURL://点击按钮跳转的目标地址
	}
>如果已经购买过商品，则不显示。
>
>接口参数：
>
>UUID://标识本机或当前微信用户，点击URL时，拼接到购买页面的尾部，可以识别本机是否购买该商品。

# 关于学习进度
> 本地记录即可
> 
> 
	[
		{
			ListID:1,
			Count:10 //已经学了多少
		}
	]
	存储键值：BookID=>JSONString
	学习完一个单词更新此键值。
