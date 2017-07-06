# 词语列表目录
	{
		ID: 1001, //列表或节点的ID值
		Name:"核心词汇", //名称
		IsList: False, //是否为词汇列表
		HasPractice:False, //是否包含真题练习
		[Children]: [...]  //子级列表，可选
	}

> GET接口或本地存储，获取全部词汇列表目录。


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
		]
	}
> GET接口，拉取词汇列表对应的真题列表。

# 词汇信息
	{
		ID：3001,//单词ID
		Word:'accept',//单词本身
		ExamRate:'10',//考试次数
		Phonogram：'',//音标
		Explain:'',//汉语解释
		Extra:[ //其他解释列表
			{
				Title:'丽丽助记',
				Content:'',//解释类型
				ContentType:'',//内容类型
			}
		]
		
	}
> GET接口，拉取词汇列表

# 广告接口
	{
		Title: // 标题信息
		Picture: //广告配图
		Button: //按钮显示的文本
		ActionURL://点击按钮跳转的目标地址
	}
>GET接口，如果已经购买过商品，则不显示。
>
>参数：UUID://标识本机或当前微信用户，点击URL时，拼接到购买页面的尾部，可以识别本机是否购买该商品。

# 关于学习进度
> 本地记录即可