/*
// Definition for a Node.
class Node {
public:
    int val;
    Node* next;
    Node* random;
    Node(int _val) : val(_val), next(nullptr), random(nullptr) {}
};
*/
#include <unordered_map>
class Solution {
public:
    Node* copyRandomList(Node* head) {
        for (Node* cur = head; cur; cur = cur->next) { // one pass // @viz walk
            Node* c = copyOf(cur); // @viz walk
            c->next = copyOf(cur->next); // may make the next copy early // @viz link
            c->random = copyOf(cur->random); // may make a copy far ahead, or reuse one behind // @viz link
        }
        return copyOf(head); // @viz return
    }

private:
    std::unordered_map<Node*, Node*> copies; // original -> copy // @viz init

    Node* copyOf(Node* node) { // get the copy, making it the first time it's needed
        if (!node) return nullptr; // @viz get
        auto it = copies.find(node); // @viz get
        if (it != copies.end()) return it->second; // @viz get
        return copies[node] = new Node(node->val); // @viz get
    }
};
