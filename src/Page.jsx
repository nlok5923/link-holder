import "semantic-ui-css/semantic.min.css";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import React from "react";
import {
  addLink,
  fetchLinks,
  addResourceLink,
  fetchResourceLinks,
} from "./service";
import {
  Container,
  Segment,
  Button,
  Grid,
  Header,
  Modal,
  Form,
  Icon,
} from "semantic-ui-react";

const App = () => {
  const [open, setOpen] = useState(false);
  const [openRes, setOpenRes] = useState(false);
  const [linkInfo, setLinkInfo] = useState({ name: "", url: "" });
  const [ResourcelinkInfo, setResourceLinkInfo] = useState({
    name: "",
    url: "",
  });
  const [links, setLinks] = useState([]);
  const [Resourcelinks, setResourceLinks] = useState([]);

  const saveLink = (e) => {
    setLinkInfo({ ...linkInfo, [e.target.name]: e.target.value });
  };

  const saveResourceLink = (e) => {
    setResourceLinkInfo({
      ...ResourcelinkInfo,
      [e.target.name]: e.target.value,
    });
  };

  const saveLinkToDB = async () => {
    if (linkInfo.name !== "" && linkInfo.url !== "") await addLink(linkInfo);
    fetchAvailaibleLinks();
    setOpen(false);
  };

  const saveResourceLinkToDB = async () => {
    if (ResourcelinkInfo.name !== "" && ResourcelinkInfo.url !== "")
      await addResourceLink(ResourcelinkInfo);
    fetchAvailaibleResourceLinks();
    setOpenRes(false);
  };

  const fetchAvailaibleLinks = async () => {
    const Alllinks = await fetchLinks();
    console.log(Alllinks);
    setLinks(Alllinks);
  };

  const fetchAvailaibleResourceLinks = async () => {
    const Alllinks = await fetchResourceLinks();
    console.log(Alllinks);
    setResourceLinks(Alllinks);
  };

  useEffect(() => {
    fetchAvailaibleLinks();
    fetchAvailaibleResourceLinks();
  }, []);

  return (
    <>
      <div style={{ height: "100vh", margin: "0 20% 0 20%" }}>
        <div>
          <Container>
            <Header as="h1" textAlign="center">
              All your class links
            </Header>
            <Segment>
              <Grid stackable columns={1} padded>
                <Grid.Column>
                  {links.map((link) => (
                    <Link to={{ pathname: link.url }} target="_blank">
                      <Button
                        fluid
                        style={{ marginTop: "15px", display:"inline" }}
                        content={link.name}
                        icon="linkify"
                        color="blue"
                        labelPosition="right"
                      />
                    </Link>
                  ))}
                </Grid.Column>
              </Grid>
            </Segment>
            <Modal
              onClose={() => setOpen(false)}
              onOpen={() => setOpen(true)}
              open={open}
              trigger={
                <Button
                  Icon
                  floated="right"
                  content="Add class Link"
                  color="green"
                  icon="add"
                />
              }
            >
              <Modal.Header>Link Information</Modal.Header>
              <Modal.Content>
                <Form>
                  <Form.Field>
                    <label> Enter course name </label>
                    <input
                      placeholder="Enter course name"
                      name="name"
                      onChange={(e) => saveLink(e)}
                    />
                    <label>Enter url </label>
                    <input
                      placeholder="Enter link"
                      name="url"
                      onChange={(e) => saveLink(e)}
                    />
                  </Form.Field>
                </Form>
              </Modal.Content>
              <Modal.Actions>
                <Button onClick={() => setOpen(false)}>Cancel</Button>
                <Button Icon onClick={() => saveLinkToDB()} positive>
                  <Icon name="save" />
                  Save
                </Button>
              </Modal.Actions>
            </Modal>

            <Header as="h1" textAlign="center">
              All your resource links
            </Header>
            <Segment>
              <Grid stackable columns={1} padded>
                <Grid.Column>
                  {Resourcelinks.map((link) => (
                    <Link to={{ pathname: link.url }} target="_blank">
                      <Button
                        fluid
                        style={{ marginTop: "15px" }}
                        content={link.name}
                        icon="linkify"
                        color="blue"
                        labelPosition="right"
                      />
                    </Link>
                  ))}
                </Grid.Column>
              </Grid>
            </Segment>
            <Modal
              onClose={() => setOpenRes(false)}
              onOpen={() => setOpenRes(true)}
              open={openRes}
              trigger={
                <Button
                  Icon
                  floated="right"
                  content="Add Resource Link"
                  color="green"
                  icon="add"
                />
              }
            >
              <Modal.Header>Link Information</Modal.Header>
              <Modal.Content>
                <Form>
                  <Form.Field>
                    <label> Enter link info </label>
                    <input
                      placeholder="Enter course name"
                      name="name"
                      onChange={(e) => saveResourceLink(e)}
                    />
                    <label>Enter url </label>
                    <input
                      placeholder="Enter link"
                      name="url"
                      onChange={(e) => saveResourceLink(e)}
                    />
                  </Form.Field>
                </Form>
              </Modal.Content>
              <Modal.Actions>
                <Button onClick={() => setOpenRes(false)}>Cancel</Button>
                <Button Icon onClick={() => saveResourceLinkToDB()} positive>
                  <Icon name="save" />
                  Save
                </Button>
              </Modal.Actions>
            </Modal>
          </Container>
        </div>
      </div>
    </>
  );
};

export default App;
