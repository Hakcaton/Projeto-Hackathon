import { OnModuleDestroy, OnModuleInit } from "@nestjs/common";

export interface IDataBase {
    noResult(query: string, params: any);
    getAll(query: string, params: any);
}

export class MySQL implements IDataBase, OnModuleInit, OnModuleDestroy {
    mysql = require('mysql');

    private connection = this.mysql.createConnection({
        host: '52.67.138.182',
        user: 'developer',
        password: 'Hackathon@123',
        database: 'Hackathon'
    });

    onModuleInit() {
        this.connection.connect();
    }

    onModuleDestroy() {
        this.connection.end();
    }

    noResult(query: string, params: any) {
        return new Promise((resolve, reject) => {

            this.connection.query(query, params, (err, rows) => {
                if (err) {
                    reject(err);
                }
                resolve(rows);
            })
        })
    }

    getAll(query: string, params: any) {
        return new Promise((resolve, reject) => {
            this.connection.query(query, params, (err, rows) => {
                if (err) {
                    reject(err);
                }
                resolve(rows);
            })
        })
    }

}