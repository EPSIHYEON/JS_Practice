import React from "react";

// 포스트 카드의 이미지 타입을 위한 리터럴 타입 (export해서 App.tsx에서도 사용)
export type PostImageType = 'image' | 'noImage';

export interface BoardCardProps{
    title: string;
    snippet:string;
    type:PostImageType;
}

interface ImageProps{
    type: PostImageType;
}

function ImagePlaceholder({type} : ImageProps){

}