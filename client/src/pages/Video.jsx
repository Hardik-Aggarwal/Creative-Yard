import React, { useEffect, useState } from "react";
import styled from "styled-components";
import DeleteIcon from "@mui/icons-material/Delete";
import ThumbUpOutlinedIcon from "@mui/icons-material/ThumbUpOutlined";
import ThumbDownOffAltOutlinedIcon from "@mui/icons-material/ThumbDownOffAltOutlined";
import ReplyOutlinedIcon from "@mui/icons-material/ReplyOutlined";
import AddTaskOutlinedIcon from "@mui/icons-material/AddTaskOutlined";
import ThumbDownIcon from "@mui/icons-material/ThumbDown";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import Comments from "../components/Comments";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { dislike, fetchSuccess, like } from "../redux/videoSlice";
import { format } from "timeago.js";
import { subscription } from "../redux/userSlice";
import Recommendation from "../components/Recommendation";
import { publicRequest, userRequest } from "../config";
import LoadingSpinner from "../utils/spinner";
import { useSnackbar } from "notistack";

const Container = styled.div`
  display: flex;
  gap: 24px;
  @media (max-width: 480px) {
  margin-top: 20px;
  flex-direction: column;
  }
`;

const Content = styled.div`
  flex: 5;
  @media (max-width: 480px) {
    padding-left: 50px; 
  }
`;
const VideoWrapper = styled.div``;

const Title = styled.h1`
  font-size: 18px;
  font-weight: 400;
  margin-top: 20px;
  margin-bottom: 10px;
  color: ${({ theme }) => theme.text};
`;

const Details = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  @media (maxwidth:480px) {
  display:block;
  }
`;

const Info = styled.span`
  color: ${({ theme }) => theme.textSoft};
`;

const Buttons = styled.div`
  display: flex;
  gap: 20px;
  color: ${({ theme }) => theme.text};
  @media (max-width: 480px) {
  margin-right: 35px;
  }
`;

const Button = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
  cursor: pointer;
    &:first-child {
    background-color: #3b3a3a;
    border-bottom-left-radius: 10px;
    border-top-left-radius: 10px;
    padding: 10px 15px;
    
  }
    &:nth-child(2) {
    background-color: #3b3a3a;
    margin-left: -20px;
    padding: 10px 15px;
    border-left: 1px solid #6f6f6f;
    border-bottom-right-radius: 10px;
    border-top-right-radius: 10px;
  }
  &:nth-child(3) {
    background-color: #3b3a3a;
    padding: 10px 15px;
    border-radius: 10px;
  }
  &:nth-child(4) {
    background-color: #3b3a3a;
    padding: 10px 15px;
    border-radius: 10px;
  }
`;
const Hr = styled.hr`
  margin: 15px 0px;
  border: 0.5px solid ${({ theme }) => theme.soft};
`;

const Channel = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const ChannelInfo = styled.div`
  display: flex;
  gap: 20px;
  @media (max-width: 480px) {
  flex-wrap: wrap;
  }
`;

const Image = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 50%;
`;

const ChannelDetail = styled.div`
  display: flex;
  flex-direction: column;
  color: ${({ theme }) => theme.text};
`;

const ChannelName = styled.span`
  font-weight: 500;
`;

const ChannelCounter = styled.span`
  margin-top: 5px;
  margin-bottom: 20px;
  color: ${({ theme }) => theme.textSoft};
  font-size: 12px;
`;

const Description = styled.p`
  font-size: 14px;
`;

const Subscribe = styled.button`
  background-color: ${(props) => (props.isSubscribed ? "#a1a6ad" : "#cc1a00")};
  font-weight: 500;
  color: white;
  border: none;
  border-radius: 10px;
  height: max-content;
  padding: 10px 20px;
  margin-left: 40px;
  cursor: pointer;
  @media (max-width: 480px) {
  margin-right: 30px;
  }
`;

const VideoFrame = styled.video`
  max-height: 720px;
  width: 100%;
  object-fit: cover;
  @media (max-width:'480px') {
  width: 100vw;
  object-fit: contain;
  }
`;

const Video = () => {
  const [isHovering, setIsHovering] = useState(false);
  const { currentUser } = useSelector((state) => state.user);
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const [isLoading, setLoading] = useState(false);

  var { currentVideo, loading } = useSelector((state) => state.video);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const path = useLocation().pathname.split("/")[2];

  const [channel, setChannel] = useState({});
  const [video, setVideo] = useState({});


  useEffect(() => {
    console.log("pathin use");
    const fetchData = async () => {
      try {
        const videoRes = await publicRequest.get(`/api/videos/find/${path}`);
        await publicRequest.put(`api/videos/view/${path}`);
        console.log(path);
        console.log("hello");
        const channelRes = await publicRequest.get(
          `/api/users/find/${videoRes.data.userId}`
        );
        setChannel(channelRes.data);
        dispatch(fetchSuccess(videoRes.data));
        setVideo(videoRes.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, [path, dispatch]);

  var { currentVideo, loading } = useSelector((state) => state.video);
  // currentVideo = video;


  const handleLike = async () => {
    if (!currentUser) {
      alert("Please login to subscribe to this channel.");
    }
    await userRequest.put(`/api/users/like/${currentVideo._id}`);
    dispatch(like(currentUser._id));
  };
  const handleDislike = async () => {
    if (!currentUser) {
      alert("Please login to subscribe to this channel.");
    }
    await userRequest.put(`/api/users/dislike/${currentVideo._id}`);
    dispatch(dislike(currentUser._id));
  };

  const handleSub = async () => {
    if (!currentUser) {
      alert("Please login to subscribe to this channel.");
    }
    currentUser.subscribedUsers.includes(channel._id)
      ? await userRequest.put(`/api/users/unsub/${channel._id}`)
      : await userRequest.put(`/api/users/sub/${channel._id}`);
    dispatch(subscription(channel._id));
  };

  // to do
  const handleDelete = async () => {
    try {
      await userRequest.delete(`/api/videos/${path}`);
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  const handleShare = async () => {
    await window.navigator.clipboard.writeText(window.location.href);
    enqueueSnackbar("Share Link is copied!", { variant: "success" });
  };

  const handleMouseEnter = () => {
    setIsHovering(true);
  };

  const handleMouseLeave = () => {
    setIsHovering(false);
  };

  return (
    <>
    {
      isLoading ? <LoadingSpinner /> : 
      <>
      <Container>
        <Content>
          <VideoWrapper>
            <VideoFrame src={currentVideo.videoUrl} controls />
          </VideoWrapper>
          <Title>{currentVideo.title}</Title>
          <Details>
                  <Channel>
                    <ChannelInfo>
                      <Image src={channel.img} />
                      <ChannelDetail>
                        <ChannelName>{channel.name}</ChannelName>
                        <ChannelCounter>
                          {channel.subscribers} subscribers
                        </ChannelCounter>
                        <Description>{currentVideo.desc}</Description>
                      </ChannelDetail>
                    </ChannelInfo>
                    <Subscribe onClick={handleSub} isSubscribed={currentUser?.subscribedUsers?.includes(channel._id) ? true : false}>
                      {currentUser?.subscribedUsers?.includes(channel._id)
                        ? "SUBSCRIBED"
                        : "SUBSCRIBE"}
                    </Subscribe>
                  </Channel>
            <Buttons>
              <Button onClick={handleLike}>
                {currentVideo.likes?.includes(currentUser?._id) ? (
                  <ThumbUpIcon />
                ) : (
                  <ThumbUpOutlinedIcon />
                )}{" "}
                {currentVideo.likes?.length}
              </Button>
              <Button onClick={handleDislike}>
                {currentVideo.dislikes?.includes(currentUser?._id) ? (
                  <ThumbDownIcon />
                ) : (
                  <ThumbDownOffAltOutlinedIcon />
                )}{" "}
                {/* Dislike */}
              </Button>
              <Button onClick={handleShare} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} style={{
                fontWeight: isHovering ? "500" : "normal",
                fontSize: isHovering ? "1.05rem" : "",
                transform: isHovering ? "rotate(-2deg)" : "",
                color: isHovering ? "lightgreen" : "",
              }}>
                <ReplyOutlinedIcon/> Share
              </Button>
              <Button>
                <AddTaskOutlinedIcon /> Save
              </Button>
              {currentUser?._id !== currentVideo.userId ? (
                <></>
              ) : (
                <Button onClick={handleDelete}>
                  <DeleteIcon /> Delete
                </Button>
              )}
            </Buttons>
          </Details>
          <Hr />
          <Details>
              <Info>
                {currentVideo.views / 2} views • {format(currentVideo.createdAt)}
              </Info>
          </Details>
          <Hr />
          <Comments videoId={currentVideo._id} />
        </Content>
        <Recommendation tags={currentVideo.tags} />
      </Container>
      </>
    }
    </>
  );
};

export default Video;
