/**
 * Definition for singly-linked list.
 * struct ListNode {
 *     int val;
 *     ListNode *next;
 *     ListNode() : val(0), next(nullptr) {}
 *     ListNode(int x) : val(x), next(nullptr) {}
 *     ListNode(int x, ListNode *next) : val(x), next(next) {}
 * };
 */
#include <vector>
class Solution {
public:
    void reorderList(ListNode* head) {
        std::vector<ListNode*> stack; // @viz init
        for (ListNode* p = head; p; p = p->next) { // push every node; the top of the stack is the tail // @viz push
            stack.push_back(p); // @viz push
        }
        ListNode* cur = head; // @viz insert
        for (size_t k = (stack.size() - 1) / 2; k > 0; --k) { // this many nodes move from the back // @viz insert
            ListNode* last = stack.back(); // the current tail // @viz insert
            stack.pop_back(); // @viz insert
            last->next = cur->next; // slip it in right after cur // @viz insert
            cur->next = last; // @viz insert
            cur = last->next; // @viz insert
        }
        stack.back()->next = nullptr; // the node on top is the new tail: cut its old link // @viz cut
    }
};
