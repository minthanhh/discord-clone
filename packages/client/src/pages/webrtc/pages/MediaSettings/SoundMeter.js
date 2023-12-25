export default class SoundMeter {
	constructor(context) {
		this.context = context
		this.instant = 0.0
		this.script = context.createScriptProcessor(2048, 1, 1)
		var that = this
		this.script.onaudioprocess = function (event) {
			var input = event.inputBuffer.getChannelData(0)
			var i
			var sum = 0.0
			// var clipcound = 0
			for (i = 0; i < input.length; ++i) {
				sum += input[i] * input[i]
				if (Math.abs(input[i]) > 0.99) {
					// clipcound += 1
				}
			}
			that.instant = Math.sqrt(sum / input.length)
		}
	}

	connectToSource(stream) {
		this.mic = this.context.createMediaStreamSource(stream)
		this.mic.connect(this.script)
		this.script.connect(this.context.destination)
	}

	stop() {
		this.mic.disconnect()
		this.script.disconnect()
	}
}
