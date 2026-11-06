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
        std::unordered_map<Node*, Node*> copies{{nullptr, nullptr}}; // original -> copy; null maps to null // @viz init
        for (Node* cur = head; cur; cur = cur->next) { // pass 1: one copy per node, not linked yet // @viz make
            copies[cur] = new Node(cur->val); // @viz make
        }
        for (Node* cur = head; cur; cur = cur->next) { // pass 2: link the copies the same way as the originals // @viz link
            copies[cur]->next = copies[cur->next]; // @viz link
            copies[cur]->random = copies[cur->random]; // @viz link
        }
        return copies[head]; // @viz return
    }
};
