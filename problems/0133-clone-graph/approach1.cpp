/*
// Definition for a Node.
class Node {
public:
    int val;
    vector<Node*> neighbors;
    Node(int _val) : val(_val) {}
};
*/
#include <unordered_map>
class Solution {
public:
    Node* cloneGraph(Node* node) {
        if (!node) return nullptr; // @viz return
        return clone(node); // @viz return
    }

private:
    std::unordered_map<Node*, Node*> copies; // original node -> its copy // @viz init

    Node* clone(Node* old) {
        auto it = copies.find(old); // @viz seen
        if (it != copies.end()) { // already copied (the graph has cycles) // @viz seen
            return it->second; // @viz seen
        }
        Node* copy = new Node(old->val); // @viz make
        copies[old] = copy; // record it BEFORE visiting neighbors // @viz make
        for (Node* nb : old->neighbors) { // @viz wire
            copy->neighbors.push_back(clone(nb)); // @viz wire
        }
        return copy; // @viz done
    }
};
