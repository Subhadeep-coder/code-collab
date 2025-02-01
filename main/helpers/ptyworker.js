// ptyWorker.js
const os = require("os");
const pty = require("node-pty");

// This variable will hold the pty process for this worker.
let ptyProcess = null;

process.on('message', (msg) => {
    switch (msg.type) {
        case 'init': {
            const { termId, shell, args, options } = msg;
            // Choose default shell if not provided.
            const usedShell = shell || (os.platform() === 'win32' ? 'cmd.exe' : 'bash');
            // Default options; note that you can tweak useConpty if desired.
            const usedOptions = options || {
                name: 'xterm-color',
                cols: 80,
                rows: 24,
                cwd: process.env.HOME,
                env: process.env,
                useConpty: false
            };

            ptyProcess = pty.spawn(usedShell, args || [], usedOptions);

            // Send data back to the main process as it is received.
            ptyProcess.onData((data) => {
                process.send({ type: 'data', termId, data });
            });
            break;
        }
        case 'input': {
            // Write user input into the pty.
            if (ptyProcess) {
                ptyProcess.write(msg.data);
            }
            break;
        }
        case 'resize': {
            // Resize the pty.
            if (ptyProcess) {
                ptyProcess.resize(msg.cols, msg.rows);
            }
            break;
        }
        case 'kill': {
            if (ptyProcess) {
                ptyProcess.kill();
                ptyProcess = null;
            }
            // Optionally, notify the main process that this worker is done.
            process.send({ type: 'killed', termId: msg.termId });
            // Exit this worker.
            process.exit(0);
            break;
        }
        default:
            console.warn(`ptyWorker received unknown message type: ${msg.type}`);
    }
});
