import ImageBox from "./components/ImageBox/ImageBox"
import LinkedImage from "./components/LinkedImage/LinkedImage"
import ImageCard from "./components/Cards/ImageCard/ImageCard"

export default function Page() {
  return <>
    <ImageBox src="/imgs/test.jpg" placeholder="shota"></ImageBox>
    <ImageBox src="/imgs/test2.jpg" placeholder="shota"></ImageBox>
    <LinkedImage src="/imgs/test3.png" placeholder="shota" url="https://nextjs.org/docs/app/building-your-application/optimizing/images#local-images" />
    <ImageCard 
      src="/imgs/test.jpg"
      title="Charming Shota with Playful Style"
      descripton="This character has a shota vibe, with youthful features, expressive eyes, and a playful expression. The round glasses, light hair, and stylish dark clothing enhance the cute, boyish aesthetic typical of this style. The green background makes the character stand out vividly."
      authorIcon="/imgs/test_small.jpg"
    ></ImageCard>
  </>
}