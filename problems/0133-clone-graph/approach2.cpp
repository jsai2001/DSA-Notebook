/*
// Definition for a Node.
class Node {
public:
    int val;
    vector<Node*> neighbors;
    Node(int _val) : val(_val) {}
};
*/
#include <queue>
#include <unordered_map>
class Solution {
public:
    Node* cloneGraph(Node* node) {
        if (!node) return nullptr; // @viz init
        std::unordered_map<Node*, Node*> copies{{node, new Node(node->val)}}; // original node -> its copy // @viz init
        std::queue<Node*> q; // @viz init
        q.push(node); // @viz init
        while (!q.empty()) { // @viz pop
            Node* old = q.front(); // @viz pop
            q.pop(); // @viz pop
            for (Node* nb : old->neighbors) { // @viz look
                if (!copies.count(nb)) { // first time we see it // @viz make
                    copies[nb] = new Node(nb->val); // copy it now, wire it when it's popped // @viz make
                    q.push(nb); // @viz make
                }
                copies[old]->neighbors.push_back(copies[nb]); // @viz wire
            }
        }
        return copies[node]; // @viz return
    }
};
