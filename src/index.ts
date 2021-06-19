import * as child_process from 'child_process';

const { execSync } = child_process;

const res = execSync('tasklist steam');
