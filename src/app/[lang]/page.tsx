import ImageBox from "../components/ImageBox/ImageBox"
import LinkedImage from "../components/LinkedImage/LinkedImage"
import ImageCard from "../components/Cards/ImageCard/ImageCard"
import HorizonalContainer from "../components/Containers/HorizonalContainer/HorizonalContainer"

export default function Page({
    params
}: {
    params: {lang: string}
}) {
    return <>
        <HorizonalContainer>
            <ImageCard 
                src="/imgs/test.jpg"
                title="Charming Shota with Playful Style"
                descripton="This character has a shota vibe, with youthful features, expressive eyes, and a playful expression. The round glasses, light hair, and stylish dark clothing enhance the cute, boyish aesthetic typical of this style. The green background makes the character stand out vividly."
                authorIcon="/imgs/test_small.jpg"
            ></ImageCard>
            <ImageCard 
                src="/imgs/test2.jpg"
                title="Snowboarding Adventure in Style"
                descripton="A dynamic and vibrant illustration of a young snowboarder striking a fun, energetic pose on the slopes. The character sports a stylish winter outfit with a bold yellow and blue jacket, complemented by purple eyes and blue hair. The background showcases a snowy mountain landscape under a clear blue sky, capturing the thrill and excitement of snowboarding."
                authorIcon="/imgs/test_small.jpg"
            ></ImageCard>
            <ImageCard 
                src="/imgs/test3.png"
                title="Good Night Rest"
                descripton="A cute and cozy illustration of a character peacefully sleeping under a blanket, with a small “おやすみ” (Good night) written in Japanese. The character’s face is partially covered by the blanket, showing only their calm expression and messy dark hair, capturing a tranquil, bedtime vibe. Perfect for expressing a gentle goodnight sentiment."
                authorIcon="/imgs/test_small.jpg"
            ></ImageCard>
            <ImageCard 
                src="/imgs/test4.jpg"
                title="Whispers of the Spirit Realm"
                descripton="An enchanting illustration featuring a young character with a serene expression, accompanied by a mystical cat. The character holds a charm in their mouth, surrounded by delicate leaves and flowing, ethereal patterns. The artwork is adorned with sunflowers in the background, giving a natural, peaceful vibe. With soft colors and intricate linework, the image captures a blend of mystery and tranquility, symbolizing a connection between the human and spirit worlds. The Japanese text below adds an authentic touch to this spiritual scene."
                authorIcon="/imgs/test_small.jpg"
            ></ImageCard>
        </HorizonalContainer>
        <LinkedImage 
            src="/imgs/test.jpg"
            url="/crypto"
        ></LinkedImage>
    </>
}