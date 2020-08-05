import * as fs from 'fs';
import * as path from 'path';

const filenamesArr: string[] = [];

const pathName = '/Users/kreedzt/Documents/Projects/learnRust/12.minigrep';

async function statFile(filename: string) {
  return new Promise((res, rej) => {
    fs.stat(filename, async (error, stats) => {
      if (error) {
        rej(`获取文件${filename}: stat失败`);
      } else {
        const isFile = stats.isFile(); //是文件
        const isDir = stats.isDirectory(); //是文件夹
        
        if (isFile) {
          filenamesArr.push(filename);
          res();
        } else if (isDir) {
          await fileDisplay(filename);
          res();
        }
      }
    });
  });
}

async function eachFile(dir: string) {
  return new Promise((res, rej) => {
    fs.readdir(dir, (err, files) => {
      if (err) {
        console.warn(err);
        rej();
      } else {
        const promiseArr: Promise<any>[] = [];
        //遍历读取到的文件列表
        files.forEach((filename) => {
          const fielder = path.join(dir, filename);
          promiseArr.push(statFile(fielder));
        });
        Promise.all(promiseArr).then(res);
      }
    })
  });
}

async function fileDisplay(dir?: string) {
  if (!dir) {
    return '请传入参数';
  } else {
    await eachFile(dir);
  }
}

(async () => {
  await fileDisplay(pathName);
  console.log('res', filenamesArr);
})();
