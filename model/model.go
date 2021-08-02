package model

type ListItem struct {
	Id      int    `json:"id"`
	Text    string `json:"text"`
	Checked bool   `json:"checked"`
}
