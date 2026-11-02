/**
 * Definition for a binary tree node.
 * struct TreeNode {
 *     int val;
 *     TreeNode *left;
 *     TreeNode *right;
 *     TreeNode() : val(0), left(nullptr), right(nullptr) {}
 *     TreeNode(int x) : val(x), left(nullptr), right(nullptr) {}
 *     TreeNode(int x, TreeNode *left, TreeNode *right) : val(x), left(left), right(right) {}
 * };
 */
#include <climits>
#include <vector>
class Solution {
public:
    bool isSubtree(TreeNode* root, TreeNode* subRoot) {
        std::vector<int> text, pattern; // @viz walk
        preorder(root, text); // @viz walk
        preorder(subRoot, pattern); // @viz walk
        // KMP. fail[i]: length of the longest proper prefix of pattern[0..i] that is also its suffix
        std::vector<int> fail(pattern.size(), 0); // @viz table
        size_t k = 0; // @viz table
        for (size_t i = 1; i < pattern.size(); ++i) { // @viz table
            while (k && pattern[i] != pattern[k]) k = fail[k - 1]; // @viz table
            if (pattern[i] == pattern[k]) ++k; // @viz table
            fail[i] = (int)k; // @viz table
        }
        k = 0; // how much of pattern matches the text read so far // @viz search
        for (int x : text) { // @viz search
            while (k && x != pattern[k]) k = fail[k - 1]; // mismatch: fall back in pattern, never back in text // @viz back
            if (x == pattern[k]) { // @viz search
                ++k; // @viz search
                if (k == pattern.size()) return true; // all of subRoot's preorder, in a row // @viz found
            }
        }
        return false; // @viz return
    }
private:
    static constexpr int NONE = INT_MIN; // stands for a missing child; node values are only -10^4..10^4
    void preorder(TreeNode* node, std::vector<int>& out) { // values in preorder, with NONE for every missing child // @viz walk
        if (!node) { // @viz walk
            out.push_back(NONE); // @viz walk
            return; // @viz walk
        }
        out.push_back(node->val); // @viz walk
        preorder(node->left, out); // @viz walk
        preorder(node->right, out); // @viz walk
    }
};
