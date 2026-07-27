export default function useSpeechSynthesis() {

    const speak = (text, onFinish) => {

        speechSynthesis.cancel();

        const utterance = new SpeechSynthesisUtterance(text);

        utterance.rate = 1;

        utterance.pitch = 1;

        utterance.volume = 1;

        utterance.onend = () => {

            if (onFinish)
                onFinish();

        };

        speechSynthesis.speak(utterance);

    };

    return { speak };

}