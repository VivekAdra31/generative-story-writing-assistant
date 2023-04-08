import Image from 'next/image'
import {Inter} from 'next/font/google'
import {Html} from "next/document";

const inter = Inter({subsets: ['latin']})

export default function Home() {
    return (
        <div data-theme={"night"}>
            <div className="navbar navbar-center bg-primary text-primary-content justify-center">
                <a className="btn btn-ghost normal-case text-xl" href="/">AI StoryWriter</a>
            </div>
            <div className="flex h-screen items-center m-8">
                <div className="flex flex-row w-screen justify-items-center h-screen">
                    <div className="flex h-5/6 w-1/2 mx-6 flex-col">
                    <textarea placeholder="Enter your text here"
                              className="textarea textarea-primary w-full h-full"></textarea>
                        <div className="flex flex-row justify-center">
                            <button className="btn btn-primary mx-2 my-2">Generate Text</button>
                            <button className="btn btn-primary mx-2 my-2">Generate Illustration</button>
                        </div>
                    </div>
                    <div className="divider divider-horizontal h-5/6"></div>
                    <div className="carousel mx-6 h-5/6 w-1/2">
                        <div id="item1" className="carousel-item">
                            <img src="https://picsum.photos/id/200/800/800" className=""/>
                        </div>
                        <div id="item2" className="carousel-item">
                            <img src="https://picsum.photos/id/222/800/800" className=""/>
                        </div>
                        <div id="item3" className="carousel-item">
                            <img src="https://picsum.photos/id/111/800/800" className=""/>
                        </div>
                        <div id="item4" className="carousel-item">
                            <img src="https://picsum.photos/id/123/800/800" className=""/>
                        </div>
                    </div>
                    <div className="flex flex-col justify-center gap-2">
                        <a href="#item1" className="btn btn-primary btn-xs">1</a>
                        <a href="#item2" className="btn btn-primary btn-xs">2</a>
                        <a href="#item3" className="btn btn-primary btn-xs">3</a>
                        <a href="#item4" className="btn btn-primary btn-xs">4</a>
                    </div>
                </div>
            </div>
        </div>
    )
}
