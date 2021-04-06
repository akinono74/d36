import {Sequelize, DataTypes} from 'sequelize'

export default (req, res) => {
    const { tenantId, userId, password } = req.query

    // コネクションの作成
    const connection = new Sequelize(
        "Desse",                // DB名
        "desseadmin",           // ユーザー名
        "Myscskadm!123",        // パスワード
        {
            dialect: "mysql",       // DBMS名
            host: "54.199.68.133"   // ホスト名
        }
    )

    // ユーザーモデルの定義
    const TM_USER = connection.define("TM_USER", {
        TENANT_ID: {
            type: DataTypes.STRING,
            primaryKey: true,
            comment: "テナントID"
        },
        USER_ID: {
            type: DataTypes.STRING,
            primaryKey: true,
            comment: "ユーザーID"
        },
        PASSWORD: {
            type: DataTypes.STRING,
            comment: "パスワード"
        }
    }, {
        createdAt: false,       // デフォルト項目を生成しない
        updatedAt: false,       // デフォルト項目を生成しない
        //tableName: "TM_USER",   // テーブル名
        freezeTableName: true   // テーブル名をモデルと同じにする
    })

    // ユーザー情報の取得
    return new Promise((resolve, reject) => {

    const Op = Sequelize.Op
    TM_USER.findOne({
        where: {
            [Op.and]: {
                TENANT_ID: tenantId,
                USER_ID: userId
            }
        }
    }).then((result) => {
        // console.log(result)
        if (result) {
            res.status(200)
            res.json({ isLogin: true, message: "" })
            resolve()
        } else {
            res.status(200)
            res.json({ isLogin: false, message: "テナントIDとユーザIDとパスワードの組み合わせが間違っています。" })
            resolve()
        }
    }).catch((error) => {
        console.log(error)
        res.status(500)
        res.json(error)
        reject()
    })

    })

}