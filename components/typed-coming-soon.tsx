"use client";

import {useEffect,useRef,useState} from "react";

const message="Coming Soon";

export function TypedComingSoon(){
  const [text,setText]=useState("");
  const [complete,setComplete]=useState(false);
  const audioRef=useRef<AudioContext|null>(null);
  const unlockedRef=useRef(false);

  useEffect(()=>{
    const reduced=window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if(reduced){
      setText(message);
      setComplete(true);
      return;
    }

    const getAudio=()=>{
      if(audioRef.current)return audioRef.current;
      const AudioContextClass=window.AudioContext||(window as typeof window&{webkitAudioContext?:typeof AudioContext}).webkitAudioContext;
      if(!AudioContextClass)return null;
      audioRef.current=new AudioContextClass();
      return audioRef.current;
    };

    const unlock=()=>{
      const audio=getAudio();
      if(audio){
        void audio.resume().then(()=>{unlockedRef.current=true}).catch(()=>{});
      }
      document.removeEventListener("pointerdown",unlock);
      document.removeEventListener("keydown",unlock);
    };

    const tone=(frequency:number,duration:number,volume:number,delay=0)=>{
      const audio=getAudio();
      if(!audio||audio.state!=="running"||!unlockedRef.current)return;
      const start=audio.currentTime+delay;
      const oscillator=audio.createOscillator();
      const gain=audio.createGain();
      oscillator.type="sine";
      oscillator.frequency.setValueAtTime(frequency,start);
      gain.gain.setValueAtTime(.0001,start);
      gain.gain.exponentialRampToValueAtTime(volume,start+.012);
      gain.gain.exponentialRampToValueAtTime(.0001,start+duration);
      oscillator.connect(gain).connect(audio.destination);
      oscillator.start(start);
      oscillator.stop(start+duration+.02);
    };

    const keySound=(index:number)=>tone(430+(index%4)*38,.055,.012);
    const revealSound=()=>{
      tone(440,.42,.028);
      tone(554.37,.46,.023,.055);
      tone(659.25,.5,.019,.11);
    };

    document.addEventListener("pointerdown",unlock,{once:true});
    document.addEventListener("keydown",unlock,{once:true});

    let index=0;
    let timer:ReturnType<typeof setTimeout>;
    const typeNext=()=>{
      index+=1;
      setText(message.slice(0,index));
      if(message[index-1]!==" ")keySound(index);
      if(index<message.length){
        timer=setTimeout(typeNext,message[index]===" "?70:115);
      }else{
        setComplete(true);
        revealSound();
      }
    };
    timer=setTimeout(typeNext,650);

    return()=>{
      clearTimeout(timer);
      document.removeEventListener("pointerdown",unlock);
      document.removeEventListener("keydown",unlock);
      void audioRef.current?.close();
      audioRef.current=null;
    };
  },[]);

  return <h1 className={complete?"typing-complete":undefined} aria-label={message}>
    <span aria-hidden="true">{text}</span>
    <i className="typing-cursor" aria-hidden="true"/>
  </h1>;
}
