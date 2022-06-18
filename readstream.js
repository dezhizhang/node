
const fs = require('fs');
const EventEmitter = require('events');

class ReadStream extends EventEmitter{
    constructor(path,options) {
        super();
        this.path = path;
        this.flags = options.flags || 'r';
        this.encoding = options.encoding || null;
        this.emitClose = options.emitClose || true;
        this.autoClose = options.autoClose || true;
        this.start = options.start || 0;
        this.end = options.end || undefined;
        this.highWaterMark = options.highWaterMark || 64 * 1024;
        
        this.flowing = false;

        this.open();

        this.on('newListener',(type) => {
            if(type === 'data') {
                this.read();
            }
        });

        this.offset = this.start;
    }

    destroy(err) {
        if(err) {
            return this.emit('error',err);
        }
        if(this.autoClose) {
            fs.close(this.fd,() => {

            })
        }
    }
    read() {
        if(typeof this.fd !== 'number') {
            return this.once('open',() => this.read())
        }
        const buffer = Buffer.alloc(this.highWaterMark);
        fs.read(this.fd,buffer,0,this.highWaterMark,this.offset,(err,bytesRead) => {
            if(bytesRead) {
                this.offset += bytesRead;
                this.emit('data',buffer);
                this.read();
            }else {
                this.emit('end');
                this.destroy();
            }
        })
    }

    open() {
        fs.open(this.path,this.flags,(err,fd) => {
            if(err) {
                return this.destroy(err);
            }
            this.fd = fd;
            this.emit('open',fd);
        })
    }

}

module.exports = ReadStream;
